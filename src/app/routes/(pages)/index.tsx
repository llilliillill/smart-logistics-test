import { createFileRoute } from "@tanstack/react-router";
import { AuctionsPage } from "@/pages/auctions";

export const Route = createFileRoute("/(pages)/")({
  component: AuctionsPage,
});
