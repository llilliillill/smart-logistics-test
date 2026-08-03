import { createLazyFileRoute } from "@tanstack/react-router";
import { BidsPage } from "@/pages/bids";

export const Route = createLazyFileRoute("/(pages)/bids/$id")({
  component: BidsPage,
});
