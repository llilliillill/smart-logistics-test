import type { AuctionPayment } from "@/entities/auction";
import { CreditCard } from "lucide-react";

export interface AuctionPaymentProps {
  payment: AuctionPayment;
}

export function AuctionPayment({ payment }: AuctionPaymentProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <CreditCard className="h-4 w-4 text-primary" /> Условия оплаты
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg border border-border/60 p-3">
          <span className="text-muted-foreground block mb-1">Форма оплаты</span>
          <strong className="text-foreground text-sm">
            {payment?.form || "Не указана"}
          </strong>
        </div>
        <div className="rounded-lg border border-border/60 p-3">
          <span className="text-muted-foreground block mb-1">Отсрочка</span>
          <strong className="text-foreground text-sm">
            {payment?.delay ? `${payment?.delay} банковских дней` : "По факту"}
          </strong>
        </div>
        <div className="rounded-lg border border-border/60 p-3">
          <span className="text-muted-foreground block mb-1">Предоплата</span>
          <strong className="text-foreground text-sm">Без предоплаты</strong>
        </div>
      </div>
    </div>
  );
}
