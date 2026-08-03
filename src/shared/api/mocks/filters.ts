import type { Auction } from "@/entities/auction";
import type { AuctionFilters } from "@/features/auction-filters";

export function filters(
  allAuctions: Auction[],
  filters: Partial<AuctionFilters> & { limit?: number; page?: number },
) {
  const {
    page = 1,
    limit = 10,
    cargo_num,
    status,
    statuses,
    auc_type,
    load_city,
    unload_city,
    date_from,
    date_to,
    is_available,
    is_bidder,
    price_from,
    price_to,
  } = filters;

  let result = [...allAuctions];

  // 1. Номер груза (cargo_num)
  if (cargo_num && String(cargo_num).trim() !== "") {
    const query = String(cargo_num).toLowerCase().trim();
    result = result.filter((item) =>
      item.main.cargo_num
        ? item.main.cargo_num.toLowerCase().includes(query)
        : false,
    );
  }

  // 2. Одиночный статус (status)
  if (status && String(status).trim() !== "") {
    const queryStatus = String(status).toLowerCase();
    result = result.filter(
      (item) => item.trading.status.toLowerCase() === queryStatus,
    );
  }

  // 3. Список статусов (statuses)
  if (statuses && Array.isArray(statuses) && statuses.length > 0) {
    const list = statuses.map((s) => String(s).toLowerCase());
    result = result.filter((item) =>
      list.includes(item.trading.status.toLowerCase()),
    );
  }

  // 4. Тип аукциона (auc_type)
  if (auc_type && String(auc_type).trim() !== "") {
    const queryType = String(auc_type).toLowerCase().trim();
    result = result.filter(
      (item) => item.main.auc_type.toLowerCase() === queryType,
    );
  }

  // 5. Город погрузки (load_city)
  if (load_city && String(load_city).trim() !== "") {
    const targetCity = String(load_city).toLowerCase().trim();
    result = result.filter((item) => {
      const city = item.route?.load?.city?.toLowerCase();
      return city ? city.includes(targetCity) : false;
    });
  }

  // 6. Город выгрузки (unload_city)
  if (unload_city && String(unload_city).trim() !== "") {
    const targetCity = String(unload_city).toLowerCase().trim();
    result = result.filter((item) => {
      const city = item.route?.unload?.city?.toLowerCase();
      return city ? city.includes(targetCity) : false;
    });
  }

  // 7. Даты погрузки (date_from / date_to)
  if (date_from) {
    const fromTime = new Date(date_from).getTime();
    result = result.filter((item) => {
      const loadDate = item.route?.load?.date;
      return loadDate ? new Date(loadDate).getTime() >= fromTime : false;
    });
  }
  if (date_to) {
    const toTime = new Date(date_to).getTime();
    result = result.filter((item) => {
      const loadDate = item.route?.load?.date;
      return loadDate ? new Date(loadDate).getTime() <= toTime : false;
    });
  }

  // 8. Доступен (can_set_bet / is_available)
  if (is_available === true || String(is_available) === "true") {
    result = result.filter((item) => Boolean(item.trading.can_set_bet));
  }

  // 9. Я участник (is_bidder)
  if (is_bidder === true || String(is_bidder) === "true") {
    result = result.filter((item) => Boolean(item.trading.is_bidder));
  }

  // 10. Цена От / До (trading.price.current)
  if (price_from !== undefined && price_from !== null && price_from !== "") {
    const minPrice = Number(price_from);
    result = result.filter((item) => {
      const currentPrice = item.trading.price?.current;
      return currentPrice !== undefined && currentPrice !== null
        ? currentPrice >= minPrice
        : false;
    });
  }
  if (price_to !== undefined && price_to !== null && price_to !== "") {
    const maxPrice = Number(price_to);
    result = result.filter((item) => {
      const currentPrice = item.trading.price?.current;
      return currentPrice !== undefined && currentPrice !== null
        ? currentPrice <= maxPrice
        : false;
    });
  }

  // Пагинация
  const totalItems = result.length;
  const numLimit = Number(limit) || 10;
  const totalPages = Math.ceil(totalItems / numLimit) || 1;
  const startIndex = (Number(page) - 1) * numLimit;

  return {
    items: result.slice(startIndex, startIndex + numLimit),
    totalPages,
    totalItems,
  };
}
