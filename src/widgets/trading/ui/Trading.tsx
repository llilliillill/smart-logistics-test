import { ShieldAlert } from "lucide-react";
import { formatPrice } from "@/shared/lib/format";
import type { AuctionTrading } from "@/entities/auction";
import { CreateBid } from "@/features/create-bid";

interface TradingProps {
  trading: AuctionTrading;
  id: string;
}

export function Trading({ trading, id }: TradingProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
        Параметры торгов
      </h2>

      {trading?.hide_points_address_and_contacts ? (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>Организатор скрыл стартовую/текущую стоимость груза</span>
        </div>
      ) : (
        <div className="mb-5 flex flex-col gap-2 rounded-lg bg-muted/40 p-3.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Текущая цена:</span>
            <strong className="text-lg font-bold text-foreground">
              {formatPrice(trading?.price?.start)}
            </strong>
          </div>

          {!!trading?.price?.current_no_vat && (
            <div className="mt-1 flex justify-between border-t border-border/40 pt-1 text-muted-foreground">
              <span>Цена без НДС:</span>
              <span className="font-medium text-foreground">
                {formatPrice(trading?.price?.current_no_vat)}
              </span>
            </div>
          )}

          {!!trading?.price?.step && (
            <div className="mt-1 flex justify-between border-t border-border/40 pt-1 text-muted-foreground">
              <span>Шаг цены:</span>
              <span className="font-medium text-foreground">
                {formatPrice(trading?.price?.step)}
              </span>
            </div>
          )}
        </div>
      )}

      <CreateBid trading={trading} id={id} />
    </div>
  );
}
