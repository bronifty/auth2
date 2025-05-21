import { assign, createMachine, createActor } from "xstate";

// Types for our OAuth state machine
type OAuthContext = {
  clients: Array<{
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
    scope: string;
  }>;
  endpoints: {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    protectedResource: string;
  };
  requests: {
    [key: string]: {
      response_type: string;
      client_id: string;
      redirect_uri: string;
      state: string;
    };
  };
  codes: {
    [key: string]: {
      authorizationEndpointRequest: {
        response_type: string;
        client_id: string;
        redirect_uri: string;
        state: string;
      };
      scope: string[];
      user: string;
    };
  };
  tokens: {
    [key: string]: {
      access_token: string;
      client_id: string;
      scope: string;
    };
  };
  currentRequest?: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    state: string;
  };
  currentCode?: string;
  currentToken?: string;
};

type OAuthEvent =
  | {
      type: "INIT_AUTH";
      data: { client_id: string; redirect_uri: string; state: string };
    }
  | { type: "AUTHORIZE"; data: { user: string; scope: string[] } }
  | { type: "REQUEST_TOKEN"; data: { code: string; client_id: string } }
  | { type: "ACCESS_RESOURCE"; data: { token: string } }
  | { type: "RESET" };

const oauthMachine = createMachine({
  id: "oauth",
  initial: "idle",
  types: {} as {
    context: OAuthContext;
    events: OAuthEvent;
  },
  context: {
    clients: [
      {
        client_id: "oauth-client-1",
        client_secret: "oauth-client-secret-1",
        redirect_uris: ["http://localhost:9000/callback"],
        scope: "foo bar",
      },
    ],
    endpoints: {
      authorizationEndpoint: "server/authorize",
      tokenEndpoint: "http://localhost:9001/token",
      protectedResource: "http://localhost:9002/resource",
    },
    requests: {},
    codes: {},
    tokens: {},
    currentRequest: undefined,
    currentCode: undefined,
    currentToken: undefined,
  },
  states: {
    idle: {
      on: {
        INIT_AUTH: {
          target: "authorization",
          actions: assign({
            currentRequest: (_, event) => {
              if (event.type !== "INIT_AUTH") return undefined;
              return {
                response_type: "code",
                client_id: event.data.client_id,
                redirect_uri: event.data.redirect_uri,
                state: event.data.state,
              };
            },
          }),
        },
      },
    },
    authorization: {
      on: {
        AUTHORIZE: {
          target: "code_generated",
          actions: assign({
            codes: ({ context, event }) => {
              const code = Math.random().toString(36).substring(2, 15);
              return {
                ...context.codes,
                [code]: {
                  authorizationEndpointRequest: context.currentRequest!,
                  scope: event.data.scope,
                  user: event.data.user,
                },
              };
            },
            currentCode: () => Math.random().toString(36).substring(2, 15),
          }),
        },
        RESET: "idle",
      },
    },
    code_generated: {
      on: {
        REQUEST_TOKEN: {
          target: "token_generated",
          actions: assign({
            tokens: ({ context, event }) => {
              const token = Math.random().toString(36).substring(2, 15);
              const scope =
                context.codes[event.data.code]?.scope.join(" ") || "";
              return {
                ...context.tokens,
                [token]: {
                  access_token: token,
                  client_id: event.data.client_id,
                  scope,
                },
              };
            },
            currentToken: () => Math.random().toString(36).substring(2, 15),
          }),
        },
        RESET: "idle",
      },
    },
    token_generated: {
      on: {
        ACCESS_RESOURCE: {
          target: "resource_accessed",
          guard: ({ context, event }) =>
            context.tokens[event.data.token] !== undefined,
        },
        RESET: "idle",
      },
    },
    resource_accessed: {
      on: {
        RESET: "idle",
      },
    },
  },
});

// Create a global actor instance
const actor = createActor(oauthMachine);

// Start the actor
actor.start();

// Helper to get current state snapshot
const getState = () => actor.getSnapshot();

// Subscribe to log state changes if needed
actor.subscribe((snapshot) => {
  console.log("OAuth State:", snapshot.value, "Context:", snapshot.context);
});

export { getState, actor };
