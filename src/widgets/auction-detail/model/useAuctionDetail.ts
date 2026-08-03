import { useQuery } from "@tanstack/react-query";

const fetchAuction = async (id: string) => {
  const res = await fetch(`/auctions/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Не удалось загрузить детальную информацию об аукционе");
  }

  return res.json();
};

export function useAuctionDetail(id: string) {
  const {
    data: auction,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auction", id],
    queryFn: async () => fetchAuction(id),
    enabled: !!id,
  });

  return { auction, isLoading, isError };
}
