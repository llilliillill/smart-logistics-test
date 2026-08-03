import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuctionFilters } from "@/features/filter-auctions";
import type { Auction, Filters } from "@/entities/auction";

interface AuctionsResponse {
  items: Auction[];
  totalPages: number;
}

const fetchAuctions = async (filters: Filters) => {
  const res = await fetch("/auctions/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      limit: 10,
      ...filters,
    }),
  });

  if (!res.ok) throw new Error("Ошибка при загрузке списка аукционов");
  return res.json();
};

export function useAuctionList() {
  const { filters, setFilters } = useAuctionFilters();

  const { data, isLoading, isError } = useQuery<AuctionsResponse>({
    queryKey: ["auctions", filters],
    queryFn: async () => fetchAuctions(filters),
    placeholderData: keepPreviousData,
  });

  const setPage = (page: number) => {
    setFilters({ page });
  };

  return {
    auctions: data?.data ?? [],
    totalPages: data?.meta?.last_page,
    currentPage: data?.meta.current_page,
    setPage,
    isLoading,
    isError,
    isEmpty: !data?.data?.length,
  };
}
