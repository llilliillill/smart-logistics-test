import { Link } from "@tanstack/react-router";
import { MapPin, Calendar, Package, CheckCircle2, CircleX } from "lucide-react";
import { formatDate, formatPrice } from "@/shared/lib/format";
import type { Auction } from "../model/types";
import { Badge, Dropdown } from "@/shared/ui";

interface AuctionCardProps {
  auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md lg:grid lg:grid-cols-[200px_1fr_1.2fr_140px_180px_auto] lg:items-center lg:gap-4 mb-2">
      <Link
        to="/auction/$id"
        params={{ id: auction?.main?.order_uid }}
        className="contents cursor-pointer"
      >
        <header className="flex items-center justify-between gap-2 lg:justify-start">
          <div className="flex flex-col items-start gap-1.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold whitespace-nowrap group-hover:text-primary transition-colors">
                №{auction?.main?.cargo_num}
              </h3>
              <Badge variant="outline">{auction?.main?.auc_type}</Badge>
            </div>
            <Badge variant="secondary">{auction?.trading?.status}</Badge>
          </div>
        </header>

        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-foreground whitespace-nowrap">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{auction?.route?.load?.city}</span> —
            <span className="truncate">{auction?.route?.unload?.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground whitespace-nowrap">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formatDate(auction?.route?.load?.date)}</span> -
            <span>{formatDate(auction?.route?.unload?.date)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-xs min-w-0">
          <div className="flex items-center gap-1.5 font-medium text-foreground min-w-0">
            <Package className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{auction?.cargo?.name}</span>
          </div>
          <span className="truncate text-muted-foreground pl-5">
            {auction?.cargo?.weight ?? "-"} т / {auction?.cargo?.volume ?? "-"}
            м³ • {auction?.cargo?.body_type ?? "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-xs">
          <span className="text-muted-foreground whitespace-nowrap">
            {auction?.trading?.status_mobile}
          </span>
          {auction?.trading?.your?.bet ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 whitespace-nowrap dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Ставка есть
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 whitespace-nowrap dark:text-gray-400">
              <CircleX className="h-3.5 w-3.5 text-gray-400" />
              Нет ставки
            </span>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 p-2 text-xs lg:bg-transparent lg:p-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Текущая
            </span>
            <strong className="text-sm font-bold text-foreground whitespace-nowrap text-center">
              {formatPrice(auction.trading?.price?.current)}
            </strong>
          </div>
          <div className="flex flex-col text-right lg:text-left">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              За км / Шаг
            </span>
            <span className="font-medium whitespace-nowrap text-muted-foreground">
              {auction.main?.price_per_km} ₽/км /
              {formatPrice(auction?.trading?.price?.step) ?? "-"}
            </span>
          </div>
        </footer>
      </Link>

      <div className="absolute right-3 top-3.5 lg:relative lg:right-0 lg:top-0 lg:flex lg:justify-end">
        <Dropdown
          options={[
            {
              id: 1,
              title: "Сделать ставку",
              onClick: () => console.log("Сделать ставку"),
            },
            {
              id: 2,
              title: "Изменить ставку",
              onClick: () => console.log("Изменить ставку"),
            },
            {
              id: 3,
              title: "Смотреть ставки",
              onClick: () => console.log("Смотреть ставки"),
            },
          ]}
        />
      </div>
    </article>
  );
}
