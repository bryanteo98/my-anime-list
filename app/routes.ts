import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("anime/:animeId", "routes/anime.tsx"),
] satisfies RouteConfig;
