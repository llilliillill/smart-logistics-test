import { EyeOff, Inbox } from "lucide-react";

export function BidListHiddenState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-10 text-center shadow-xs">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <EyeOff className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        История ставок скрыта
      </h3>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        Организатор аукциона ограничил просмотр списка ставок и участников для
        обеспечения конфиденциальности.
      </p>
    </div>
  );
}

export function BidListEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-10 text-center shadow-xs">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        Ставок пока нет
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Будьте первым, кто сделает ценовое предложение в этом аукционе.
      </p>
    </div>
  );
}
