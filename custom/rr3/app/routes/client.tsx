import { useFetcher } from "react-router";
import type { Route } from "./+types/client";

export default function Client() {
  const fetcher = useFetcher();
  return (
    <div>
      <h1>Client</h1>
      <button
        onClick={function () {
          fetcher.load("client/authorize");
        }}
      >
        Client Authorize
      </button>
    </div>
  );
}
