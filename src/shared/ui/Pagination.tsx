import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationItem = number | "...";

function generatePaginationPages(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = generatePaginationPages(currentPage, totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Пагинация"
      className="flex items-center justify-center gap-1.5 py-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage || isLoading}
        aria-label="Перейти на предыдущую страницу"
        className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Назад</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          const itemKey =
            typeof page === "number" ? `page-${page}` : `ellipsis-${index}`;

          if (page === "...") {
            return (
              <span
                key={itemKey}
                className="flex h-9 w-9 items-center justify-center text-muted-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <button
              key={itemKey}
              type="button"
              onClick={() => onPageChange(Number(page))}
              disabled={isLoading}
              aria-current={isCurrent ? "page" : undefined}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                isCurrent
                  ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                  : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              } disabled:pointer-events-none disabled:opacity-50`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage || isLoading}
        aria-label="Перейти на следующую страницу"
        className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        <span className="hidden sm:inline">Вперед</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
