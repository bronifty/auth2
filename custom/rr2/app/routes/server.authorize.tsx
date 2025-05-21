import { useLoaderData } from "react-router";

export async function loader() {
  return {
    message: "Hello, world!",
  };
}

export default function ServerAuthorize() {
  const data = useLoaderData();
  return <div>{data.message}</div>;
}
