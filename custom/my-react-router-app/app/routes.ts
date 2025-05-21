import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/client.tsx"),
    route("client/authorize", "./routes/client.authorize.tsx"),
    route("server/authorize", "./routes/server.authorize.tsx"),
    route("products", "./routes/products.tsx"),
    route("resource", "./routes/resource.tsx"),
  ]),
] satisfies RouteConfig;
