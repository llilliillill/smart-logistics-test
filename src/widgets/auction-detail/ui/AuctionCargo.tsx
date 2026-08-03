import type { AuctionCargo } from "@/entities/auction";
import { Package, Truck } from "lucide-react";

export interface AuctionCargoProps {
  cargo: AuctionCargo;
}

export function AuctionCargo({ cargo }: AuctionCargoProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Package className="h-4 w-4 text-primary" /> Груз и транспортные
        требования
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
        <div className="flex flex-col gap-2 rounded-lg bg-muted/30 p-3">
          <span className="font-semibold text-foreground text-sm">
            {cargo?.name}
          </span>
          <div className="flex justify-between border-b border-border/50 py-1">
            <span className="text-muted-foreground">Вес / Объём:</span>
            <span className="font-medium text-foreground">
              {cargo?.weight ?? "—"} т / {cargo?.volume ?? "—"} м³
            </span>
          </div>
          {cargo?.body_type && (
            <div className="flex justify-between border-b border-border/50 py-1">
              <span className="text-muted-foreground">Тип кузова:</span>
              <span className="font-medium text-foreground">
                {cargo?.body_type}
              </span>
            </div>
          )}
          {cargo?.loading_types && (
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Тип погрузки:</span>
              <div className="font-medium text-foreground">
                {cargo?.loading_types?.side && <span>Боковая погрузка, </span>}
                {cargo?.loading_types?.top && <span>Верхняя погрузка, </span>}
                {cargo?.loading_types?.rear && <span>Задняя погрузка, </span>}
                {cargo?.loading_types?.full && (
                  <span>Полная растентовка, </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-muted/30 p-3">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Truck className="h-4 w-4 text-muted-foreground" /> Спецификация ТС
          </div>
          <div className="flex justify-between border-b border-border/50 py-1">
            <span className="text-muted-foreground">Кол-во машин:</span>
            <span className="font-medium text-foreground">
              {cargo?.truck_count} ед.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
