import { createRootRoute } from "@tanstack/react-router";
import { DefaultLayout } from "@/shared/layouts";

export const Route = createRootRoute({
  component: DefaultLayout,
});
