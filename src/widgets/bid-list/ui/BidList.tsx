import { useParams } from "@tanstack/react-router";
import { BidListHeader } from "./BidListHeader";
import { useBetsHistory, type Bid, BidCard } from "@/entities/bid";

export function BidList() {
  const { id } = useParams({ from: "/(pages)/bids/$id" });
  const { bets, isLoading, isError, isEmpty } = useBetsHistory(id);

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Загрузка ставок...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center text-sm text-destructive">
        Не удалось загрузить историю ставок.
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center text-sm text-destructive">
        Нет ставок
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <BidListHeader
        betsCount={bets?.bets?.length}
        participantsCount={bets?.participantsCount}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs mt-4">
        <div className="divide-y divide-border">
          {bets?.bets?.map((bet: Bid, index: number) => (
            <BidCard key={bet.id} bet={bet} fallbackRank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
