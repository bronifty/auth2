import { Link, Outlet } from "react-router";

import "./app.css";
// import { useOAuth } from "./context";
export default function Layout() {
  // const { clients, endpoints, requests, codes, tokens } = useOAuth();
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/server-toggle">Server Toggle</Link>
      </header>
      <Outlet />
      <footer>
        <hr />
        {/* <p>
          clients: {JSON.stringify(clients, null, 2)}
          <br />
          endpoints: {JSON.stringify(endpoints, null, 2)}
          <br />
          requests: {JSON.stringify(requests, null, 2)}
          <br />
          codes: {JSON.stringify(codes, null, 2)}
          <br />
          tokens: {JSON.stringify(tokens, null, 2)}
        </p> */}
      </footer>
    </>
  );
}
