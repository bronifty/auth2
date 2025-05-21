import { toggleActor, getToggleState } from "../state.machine";

// Resource route that returns the current state
export async function loader({ request }: { request: Request }) {
  // Get the URL and check for query parameters
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  // If an action is specified, send it to the state machine
  if (action === "toggle") {
    toggleActor.send({ type: "toggle" });
  }

  // Always return the current state
  const state = getToggleState();

  return Response.json({
    value: state.value,
    count: state.context.count,
    maxCount: state.context.maxCount,
    timestamp: new Date().toISOString(),
  });
}
