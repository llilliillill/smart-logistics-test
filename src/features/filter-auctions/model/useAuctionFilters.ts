import { useSearch, useNavigate } from "@tanstack/react-router";
import type { AuctionFilters } from "./auctionFilterSchema";

export function useAuctionFilters() {
  const filters = useSearch({ strict: false }) as AuctionFilters;
  const navigate = useNavigate();

  const setFilters = (newFilters: Partial<AuctionFilters>) => {
    navigate({
      search: (prev) => ({
        ...(prev as Record<string, unknown>),
        ...newFilters,
        page: newFilters.page ?? 1,
      }),
      replace: true,
    });
  };

  const resetFilters = () => {
    navigate({
      search: () => ({ page: 1 }),
      replace: true,
    });
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
}
