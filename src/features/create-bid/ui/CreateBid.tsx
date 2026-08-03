import { AlertCircle, TrendingDown } from "lucide-react";

import type { AuctionTrading } from "@/entities/auction";
import { useCreateBid } from "../model/useCreateBid";

interface CreateBidProps {
  trading: AuctionTrading;
  id: string;
}

export function CreateBid({ trading, id }: CreateBidProps) {
  const { register, handleSubmit, onSubmit, errors, isPending, isSubmitting } =
    useCreateBid(id);

  if (!trading?.can_set_bet) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
        <span>
          Подача ставок недоступна (вы не участник или торги завершены)
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <label htmlFor="amount-input">
            Ваше предложение (₽): <span className="text-destructive">*</span>
          </label>
        </div>

        <input
          type="number"
          id="amount-input"
          step={trading?.price?.step}
          {...register("amount", { valueAsNumber: true })}
          placeholder="Введите сумму"
          className={`h-10 rounded-lg border bg-background px-3 text-sm font-semibold outline-none transition-all ${
            errors.amount
              ? "border-destructive focus:ring-2 focus:ring-destructive/20"
              : "border-input focus:ring-2 focus:ring-ring"
          }`}
        />

        {errors.amount && (
          <span className="mt-0.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {errors.amount.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting || isPending ? (
          "Отправка..."
        ) : (
          <>
            <TrendingDown className="h-4 w-4" /> Подать ставку
          </>
        )}
      </button>
    </form>
  );
}
