import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/client.tsx"),
    route("client/authorize", "./routes/client.authorize.ts"),
    route("server/authorize", "./routes/server.authorize.tsx"),
    route("server-toggle", "./routes/server-toggle.tsx"),
    route("api/toggle", "./routes/api.toggle.ts"),
  ]),
] satisfies RouteConfig;
