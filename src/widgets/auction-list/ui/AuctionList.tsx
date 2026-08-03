import { AuctionCard, type Auction } from "@/entities/auction";
import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { AuctionSkeleton } from "./AuctionSkeleton";
import { useAuctionList } from "../model/useAuctionList";
import { AuctionFilters } from "@/features/filter-auctions";
import { Pagination } from "@/shared/ui";

export function AuctionList() {
  const {
    auctions,
    totalPages,
    currentPage,
    setPage,
    isLoading,
    isError,
    isEmpty,
  } = useAuctionList();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6">
      <AuctionFilters />

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <AuctionSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 p-8 text-center text-destructive">
          <AlertCircle className="mb-2 h-8 w-8" />
          <h4 className="text-sm font-semibold">
            Не удалось загрузить список аукционов
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Проверьте соединение с сетью или попробуйте позже.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground transition-opacity hover:opacity-90 cursor-pointer">
            <RefreshCw className="h-3.5 w-3.5" /> Повторить попытку
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-muted-foreground">
          <Inbox className="mb-3 h-10 w-10 text-muted-foreground/60" />
          <h4 className="text-base font-medium text-foreground">
            Аукционы не найдены
          </h4>
          <p className="mt-1 text-xs">
            По вашему запросу ничего не найдено. Попробуйте изменить параметры
            поиска.
          </p>
        </div>
      )}

      {!isLoading && !isError && !isEmpty && (
        <div className="flex flex-col gap-3">
          <div>
            {auctions.map((auction: Auction) => (
              <AuctionCard key={auction.main.id} auction={auction} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      )}
    </section>
  );
}
