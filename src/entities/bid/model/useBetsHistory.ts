import { useQuery } from "@tanstack/react-query";

export function useBetsHistory(id: string) {
  const {
    data: bets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bets", id],
    queryFn: async () => {
      const res = await fetch(`/auctions/${id}/bets`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Ошибка при загрузке ставок");

      return res.json();
    },
  });

  return {
    bets,
    isLoading,
    isError,
    isEmpty: !bets?.bets?.length,
  };
}
