import type { AuctionRoutes } from "@/entities/auction";
import { formatDate } from "@/shared/lib/format";
import { MapPin, Calendar } from "lucide-react";

interface AuctionRouteProps {
  routes: AuctionRoutes[];
}

export function AuctionRoute({ routes }: AuctionRouteProps) {
  if (routes?.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <MapPin className="h-4 w-4 text-primary" /> Маршрут движения
        </h2>

        <div className="relative flex flex-col gap-4 pl-4 before:absolute before:bottom-2 before:left-5.25 before:top-2 before:w-0.5 before:bg-border">
          {routes.map((route, index) => {
            const isLoad = !!(index % 2 === 0);
            return (
              <div
                key={route.row_num || index}
                className="relative flex items-start gap-4"
              >
                <span
                  className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                    isLoad ? "bg-emerald-500" : "bg-blue-500"
                  }`}
                >
                  {index + 1}
                </span>

                <div className="flex flex-1 flex-col gap-1 rounded-lg bg-muted/40 p-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-medium text-foreground">
                    <span className="text-sm font-semibold">
                      {isLoad ? "Погрузка" : "Выгрузка"}:
                      {route?.location?.city_name || "—"}
                    </span>
                    {route.start_date && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(route?.start_date) || ""}
                      </span>
                    )}
                  </div>

                  {!route?.location.loading_address ? (
                    <span className="italic text-muted-foreground">
                      Точный адрес скрыт организатором до подтверждения заявки
                    </span>
                  ) : (
                    route?.location.loading_address && (
                      <span className="text-foreground">
                        {route?.location.loading_address}
                      </span>
                    )
                  )}

                  {route?.comment && (
                    <span className="mt-1 text-muted-foreground">
                      Примечание: {route?.comment}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
