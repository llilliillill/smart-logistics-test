import { CITIES, AUCTION_TYPE, AUCTION_STATUS } from "@/shared/lib/consts";
import { useAuctionFilters } from "../model/useAuctionFilters";
import { Filter, RotateCcw } from "lucide-react";

export function AuctionFilters() {
  const { filters, setFilters, resetFilters } = useAuctionFilters();

  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
          <Filter className="h-4 w-4" />
          <span>Фильтры</span>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Сбросить
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">№ Груза</label>
          <input
            type="text"
            placeholder="Например: 1042"
            value={filters.cargo_num || ""}
            onChange={(e) =>
              setFilters({ cargo_num: e.target.value || undefined })
            }
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">
            Город погрузки
          </label>
          <select
            value={filters.load_city || ""}
            onChange={(e) =>
              setFilters({ load_city: e.target.value || undefined })
            }
            className="h-9 rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Все города</option>
            {CITIES.map((city) => (
              <option key={city.id} value={city.label}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">
            Город выгрузки
          </label>
          <select
            value={filters.unload_city || ""}
            onChange={(e) =>
              setFilters({ unload_city: e.target.value || undefined })
            }
            className="h-9 rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Все города</option>
            {CITIES.map((city) => (
              <option key={city.id} value={city.label}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Тип аукциона</label>
          <select
            value={filters.auc_type || ""}
            onChange={(e) =>
              setFilters({ auc_type: e.target.value || undefined })
            }
            className="h-9 rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Все типы</option>
            {AUCTION_TYPE.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Статус</label>
          <select
            value={filters.status || ""}
            onChange={(e) =>
              setFilters({ status: e.target.value || undefined })
            }
            className="h-9 rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Все статусы</option>
            {AUCTION_STATUS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Дата погрузки От / До */}
        <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-1">
          <label className="text-xs text-muted-foreground">
            Дата погрузки (от / до)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={filters.date_from || ""}
              onChange={(e) =>
                setFilters({ date_from: e.target.value || undefined })
              }
              className="h-9 w-full rounded-lg border border-input bg-background px-2 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="text-muted-foreground">-</span>
            <input
              type="date"
              value={filters.date_to || ""}
              onChange={(e) =>
                setFilters({ date_to: e.target.value || undefined })
              }
              className="h-9 w-full rounded-lg border border-input bg-background px-2 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Цена От / До */}
        <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-1">
          <label className="text-xs text-muted-foreground">
            Цена ₽ (от / до)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder="От"
              value={filters.price_from ?? ""}
              onChange={(e) =>
                setFilters({
                  price_from: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="text-muted-foreground">-</span>
            <input
              type="number"
              placeholder="До"
              value={filters.price_to ?? ""}
              onChange={(e) =>
                setFilters({
                  price_to: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Чекбоксы: is_available, is_bidder */}
        <div className="flex items-center gap-4 pt-4 sm:col-span-2 md:col-span-1">
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(filters.is_available)}
              onChange={(e) =>
                setFilters({ is_available: e.target.checked || undefined })
              }
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            Доступен
          </label>

          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(filters.is_bidder)}
              onChange={(e) =>
                setFilters({ is_bidder: e.target.checked || undefined })
              }
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            Я участник
          </label>
        </div>
      </div>
    </div>
  );
}
