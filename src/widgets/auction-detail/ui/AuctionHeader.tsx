import type { Auction } from "@/entities/auction";
import { formatPrice } from "@/shared/lib/format";
import { Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/shared/ui";

interface AuctionHeaderProps {
  auction: Auction;
}

export function AuctionHeader({ auction }: AuctionHeaderProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-foreground">
            Аукцион №{auction?.main?.cargo_num}
          </h1>
          <Badge variant="outline">{auction?.main?.auc_type}</Badge>
        </div>
        {auction?.trading?.status && (
          <Badge variant="secondary">{auction?.trading?.status}</Badge>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
        {auction?.trading?.status_mobile && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              Статус участия:{" "}
              <strong className="text-foreground">
                {auction?.trading?.status_mobile}
              </strong>
            </span>
          </div>
        )}
        {auction?.trading?.your?.bet && (
          <div className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>
              Ваша ставка сделана
              {auction?.trading?.your?.bet
                ? ` (${formatPrice(auction?.trading?.your?.last_bet)})`
                : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
