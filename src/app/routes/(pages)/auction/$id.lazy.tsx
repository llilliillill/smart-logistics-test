import { createLazyFileRoute } from "@tanstack/react-router";
import { AuctionPage } from "@/pages/auction";

export const Route = createLazyFileRoute("/(pages)/auction/$id")({
  component: AuctionPage,
});
