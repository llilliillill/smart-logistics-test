import { createRouter, RouterProvider as Router } from "@tanstack/react-router";
import { routeTree } from "@/app/routes/-routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterProvider() {
  return <Router router={router} />;
}
