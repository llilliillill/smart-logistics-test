import type { BidsHistory } from "@/entities/bid";
import { formatDate } from "@/shared/lib/format";
import { Link } from "@tanstack/react-router";
import { History, ExternalLink } from "lucide-react";

export interface AuctionBetsProps {
  id: string;
  bets: BidsHistory;
}

export function AuctionBetsHistory({ id, bets }: AuctionBetsProps) {
  if (bets?.hideBetsHistory || !bets?.bets?.length) return;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <History className="h-4 w-4 text-primary" /> История торгов
        </h2>
        {id && (
          <Link
            to="/bids/$id"
            params={{ id }}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline cursor-pointer"
          >
            <span>Все ставки</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </div>
      <div className="divide-y divide-border text-xs">
        {bets?.bets?.map((bet) => {
          const isMine = false;
          return (
            <div
              key={bet?.id}
              className="flex items-center justify-between py-2.5"
            >
              <span className="text-muted-foreground">
                {formatDate(bet?.created_at)}
              </span>
              <div className="flex items-center gap-2">
                {isMine && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Ваша
                  </span>
                )}
                <strong className="font-semibold text-foreground">
                  {bet?.price_with_vat
                    ? `${bet.price_with_vat.toLocaleString("ru-RU")} ₽`
                    : "—"}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
