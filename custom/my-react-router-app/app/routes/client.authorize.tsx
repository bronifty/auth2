import type { Route } from "./+types/client.authorize";
import randomstring from "randomstring";
import { redirect, useNavigate } from "react-router";
import { getOAuthState, addRequest } from "../store/oauth";
import { buildUrl } from "../utils";

export async function loader(_: Route.LoaderArgs) {
  // // Get the current state from XState
  // const { clients, endpoints } = getOAuthState();
  // const state = randomstring.generate();
  // // Create the request
  // const request = {
  //   response_type: "code",
  //   client_id: clients[0].client_id,
  //   redirect_uri: clients[0].redirect_uris[0],
  //   state,
  // };
  // // Add the request to our state
  // addRequest(state, request);
  // const authorizeUrl = buildUrl(endpoints.authorizationEndpoint, request);
  // console.log("redirect", authorizeUrl);
  // return redirect(authorizeUrl);
  const navigate = useNavigate();
  navigate("server/authorize");
}
