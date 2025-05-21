import { createContext, useContext, useState } from "react";

interface Client {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  scope: string;
}

const clients: Client[] = [
  {
    client_id: "oauth-client-1",
    client_secret: "oauth-client-secret-1",
    redirect_uris: ["http://localhost:5173/callback"],
    scope: "foo bar",
  },
];

interface Endpoints {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  protectedResource: string;
}

const endpoints: Endpoints = {
  authorizationEndpoint: "server/authorize",
  tokenEndpoint: "http://localhost:9001/token",
  protectedResource: "http://localhost:9002/resource",
};

interface Requests {
  [key: string]: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    state: string;
  };
}

const requests: Requests = {};

interface Codes {
  [key: string]: {
    authorizationEndpointRequest: Requests;
    scope: string[];
    user: string;
  };
}

const codes: Codes = {};

interface Tokens {
  [key: string]: {
    access_token: string;
    client_id: string;
    scope: string;
  };
}

const tokens: Tokens = {};

interface OAuthContextType {
  clients: Client[];
  endpoints: Endpoints;
  requests: Requests;
  codes: Codes;
  tokens: Tokens;
  addRequest: (
    requestId: string,
    request: {
      response_type: string;
      client_id: string;
      redirect_uri: string;
      state: string;
    }
  ) => void;
  getRequest: (requestId: string) => any;
  removeRequest: (requestId: string) => void;
  addCode: (
    codeId: string,
    code: { authorizationEndpointRequest: any; scope: string[]; user: string }
  ) => void;
  getCode: (codeId: string) => any;
  removeCode: (codeId: string) => void;
  addToken: (
    tokenId: string,
    token: { access_token: string; client_id: string; scope: string }
  ) => void;
  getToken: (tokenId: string) => any;
  removeToken: (tokenId: string) => void;
}

const OAuthContext = createContext<OAuthContextType | undefined>(undefined);

export function OAuthProvider({ children }: { children: React.ReactNode }) {
  const [requestsState, setRequestsState] = useState<Requests>(requests);
  const [codesState, setCodesState] = useState<Codes>(codes);
  const [tokensState, setTokensState] = useState<Tokens>(tokens);

  // Request management functions
  const addRequest = (
    requestId: string,
    request: {
      response_type: string;
      client_id: string;
      redirect_uri: string;
      state: string;
    }
  ) => {
    setRequestsState((prev) => ({
      ...prev,
      [requestId]: request,
    }));
  };

  const getRequest = (requestId: string) => {
    return requestsState[requestId];
  };

  const removeRequest = (requestId: string) => {
    setRequestsState((prev) => {
      const newRequests = { ...prev };
      delete newRequests[requestId];
      return newRequests;
    });
  };

  // Code management functions
  const addCode = (
    codeId: string,
    code: { authorizationEndpointRequest: any; scope: string[]; user: string }
  ) => {
    setCodesState((prev) => ({
      ...prev,
      [codeId]: code,
    }));
  };

  const getCode = (codeId: string) => {
    return codesState[codeId];
  };

  const removeCode = (codeId: string) => {
    setCodesState((prev) => {
      const newCodes = { ...prev };
      delete newCodes[codeId];
      return newCodes;
    });
  };

  // Token management functions
  const addToken = (
    tokenId: string,
    token: { access_token: string; client_id: string; scope: string }
  ) => {
    setTokensState((prev) => ({
      ...prev,
      [tokenId]: token,
    }));
  };

  const getToken = (tokenId: string) => {
    return tokensState[tokenId];
  };

  const removeToken = (tokenId: string) => {
    setTokensState((prev) => {
      const newTokens = { ...prev };
      delete newTokens[tokenId];
      return newTokens;
    });
  };

  const value = {
    clients,
    endpoints,
    requests: requestsState,
    codes: codesState,
    tokens: tokensState,
    addRequest,
    getRequest,
    removeRequest,
    addCode,
    getCode,
    removeCode,
    addToken,
    getToken,
    removeToken,
  };

  return (
    <OAuthContext.Provider value={value}>{children}</OAuthContext.Provider>
  );
}

export function useOAuth() {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error("useOAuth must be used within an OAuthProvider");
  }
  return context;
}
