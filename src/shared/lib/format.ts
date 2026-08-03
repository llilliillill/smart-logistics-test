export function formatDate(date: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function formatPrice(price?: number | null): string {
  if (price === undefined || price === null || isNaN(price)) {
    return "—";
  }

  return `${price.toLocaleString("ru-RU")} ₽`;
}
