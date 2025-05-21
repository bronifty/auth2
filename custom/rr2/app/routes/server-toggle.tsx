import { useLoaderData, useFetcher } from "react-router";
import { actor, getState } from "../state.machine";
import { useEffect, useState } from "react";

// Server-side loader
export function loader() {
  // Get current state from the global actor
  const state = getState();

  return Response.json({
    value: state.value,
    count: state.context.count,
    maxCount: state.context.maxCount,
  });
}

// Server-side action
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "toggle") {
    // Send toggle event to the global actor
    actor.send({ type: "toggle" });
  }

  // Simple redirect
  return null;
}

export default function ServerToggle() {
  // @ts-ignore - Simplified for demo
  const state = useLoaderData();
  const fetcher = useFetcher();
  const [localState, setLocalState] = useState(state);

  // Update local state when fetcher data changes
  useEffect(() => {
    if (fetcher.data) {
      setLocalState(fetcher.data);
      // Update the actor with the new state from the server
      actor.send({ type: "SYNC", data: fetcher.data });
    }
  }, [fetcher.data]);

  // Function to use the fetcher to update state
  const updateWithFetcher = () => {
    fetcher.load("/api/toggle?action=toggle");
  };

  return (
    <div>
      <h1>Server-Side State Machine</h1>
      <div>Value: {String(localState.value)}</div>
      <div>Count: {localState.count}</div>
      <div>Max Count: {localState.maxCount}</div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={updateWithFetcher}>Toggle (Fetcher)</button>
      </div>

      {fetcher.data && (
        <div
          style={{
            color: "black",
            marginTop: "20px",
            padding: "10px",
            background: "#f0f0f0",
          }}
        >
          <h3>Last Fetcher Response:</h3>
          <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
