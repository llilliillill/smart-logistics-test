import { Users, TrendingDown } from "lucide-react";

interface BidListHeaderProps {
  betsCount: number;
  participantsCount: number;
}

export function BidListHeader({
  betsCount,
  participantsCount,
}: BidListHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <TrendingDown className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">
            История предложений
          </h2>
          <p className="text-xs text-muted-foreground">
            Всего сделано ставок: {betsCount}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span>
          Участников: <strong>{participantsCount}</strong>
        </span>
      </div>
    </div>
  );
}
