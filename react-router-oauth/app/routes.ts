import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/client.tsx"),
    route("server", "./routes/server.tsx"),
  ]),
] satisfies RouteConfig;
