import type { Bid } from "@/entities/bid";
import { formatDate } from "@/shared/lib/format";
import { Trophy, XCircle, Building, HelpCircle } from "lucide-react";

interface BidProps {
  bet: Bid;
  fallbackRank: number;
}

export function BidCard({ bet, fallbackRank }: BidProps) {
  return (
    <div
      className={`flex flex-col justify-between gap-4 p-4 transition-colors sm:flex-row sm:items-center ${
        bet?.is_win
          ? "bg-emerald-500/5 dark:bg-emerald-500/10"
          : bet?.is_rejected
            ? "bg-muted/20 opacity-75"
            : "hover:bg-muted/30"
      }`}
    >
      <div className="flex items-start gap-3.5 sm:items-center">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            bet?.is_win
              ? "bg-emerald-500 text-white"
              : bet?.is_rejected
                ? "bg-muted text-muted-foreground"
                : "bg-secondary text-secondary-foreground"
          }`}
        >
          {bet?.is_win ? (
            <Trophy className="h-4 w-4" />
          ) : (
            `#${bet?.place ?? fallbackRank}`
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Building className="h-3.5 w-3.5 text-muted-foreground" />
              {bet?.organization_name}
            </span>

            {bet?.is_win && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <Trophy className="h-3 w-3" /> Победитель
              </span>
            )}

            {bet?.is_rejected && (
              <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                <XCircle className="h-3 w-3" /> Ставка отменена
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {bet?.created_at && <span>{formatDate(bet?.created_at)}</span>}
            {bet?.is_rejected && bet?.cancel_reason && (
              <span className="flex items-center gap-1 italic text-destructive">
                <HelpCircle className="h-3 w-3" /> Причина: {bet?.cancel_reason}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-0.5 sm:text-right">
        <div
          className={`text-base font-bold ${
            bet?.is_rejected
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {bet?.price_with_vat
            ? `${bet?.price_with_vat.toLocaleString("ru-RU")} ₽`
            : bet?.price_no_vat
              ? `${bet?.price_no_vat.toLocaleString("ru-RU")} ₽`
              : "—"}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            {bet?.price_with_vat ? "с НДС" : "без НДС"}
          </span>
        </div>

        {bet?.price_with_vat && bet?.price_no_vat && (
          <span
            className={`text-xs text-muted-foreground ${
              bet?.is_rejected ? "line-through" : ""
            }`}
          >
            {bet?.price_no_vat.toLocaleString("ru-RU")} ₽ без НДС
          </span>
        )}
      </div>
    </div>
  );
}
