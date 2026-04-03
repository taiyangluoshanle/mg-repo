import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("general", "routes/general.tsx"),
  route("data-display", "routes/data-display.tsx"),
  route("form", "routes/form.tsx"),
  route("feedback", "routes/feedback.tsx"),
  route("overlay", "routes/overlay.tsx"),
  route("navigation", "routes/navigation.tsx"),
  route("commerce", "routes/commerce.tsx"),
  route("utils", "routes/utils.tsx"),
] satisfies RouteConfig;
