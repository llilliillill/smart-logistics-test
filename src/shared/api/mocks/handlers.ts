import { db, CITIES_DICTIONARY } from "./db";
import { http, HttpResponse } from "msw";
import { filters } from "@/shared/api/mocks/filters";
import type { BetItem } from "@/entities/auction";

// 💡 Локальный реестр ставок в памяти, привязаный к auction_id
const betsStore: Record<number, BetItem[]> = {};

// Инициализируем стартовые ставки из исходной db.auctions
db.auctions.forEach((auction) => {
  if (auction.trading.your?.last_bet) {
    betsStore[auction.main.id] = [
      {
        id: Date.now(),
        created_at: new Date().toISOString(),
        auction_id: auction.main.id,
        subscriber_id: 999,
        contact_name: "Иван Иванов",
        contact_phone: "+7 (999) 000-00-00",
        price_with_vat: auction.trading.your.last_bet,
        price_no_vat: Math.round(auction.trading.your.last_bet / 1.2),
        organization_id: 500,
        organization_inn: "7700000000",
        organization_name: "Наша Перевозочная Компания (Вы)",
        transporter_comment: null,
        is_rejected: false,
        is_counter: false,
        place: 1,
        is_win: auction.trading.your.win || false,
        run_number: 1,
        cancel_reason: "",
      },
    ];
  } else {
    betsStore[auction.main.id] = [];
  }
});

export const handlers = [
  // 1. Словарь городов
  http.get("/api/dictionaries/cities", () => {
    return HttpResponse.json(CITIES_DICTIONARY);
  }),

  // 2. Список аукционов (POST /auctions/list по OpenAPI)
  http.post("/auctions/list", async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as Record<
      string,
      any
    >;
    const page = Number(body.page) || 1;
    const limit = Number(body.limit) || 10;

    const { items, totalPages, totalItems } = filters(db.auctions, body);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json({
      data: items,
      meta: {
        current_page: page,
        from: (page - 1) * limit + 1,
        last_page: totalPages,
        per_page: limit,
        to: Math.min(page * limit, totalItems),
        total: totalItems,
      },
    });
  }),

  // 3. GET /auctions/{auctionUuid} (ищем по order_uid или id)
  http.get("/auctions/:auctionUuid", ({ params }) => {
    const targetUuid = String(params.auctionUuid);
    const auction = db.auctions.find(
      (a) =>
        a.main.order_uid === targetUuid || String(a.main.id) === targetUuid,
    );

    if (!auction) {
      return HttpResponse.json(
        { code: "NOT_FOUND", message: "Аукцион не найден" },
        { status: 404 },
      );
    }
    return HttpResponse.json(auction, { status: 200 });
  }),

  // 4. GET /auctions/{auctionUuid}/bets — ПОЛУЧЕНИЕ СТАВОК ИЗ REPOSITORY
  http.get("/auctions/:auctionUuid/bets", ({ params }) => {
    const targetUuid = String(params.auctionUuid);
    const auction = db.auctions.find(
      (a) =>
        a.main.order_uid === targetUuid || String(a.main.id) === targetUuid,
    );

    if (!auction) {
      return HttpResponse.json(
        { code: "NOT_FOUND", message: "Аукцион не найден" },
        { status: 404 },
      );
    }

    if (auction.trading.hide_bets_history) {
      return HttpResponse.json(
        {
          hideBetsHistory: true,
          message: "История ставок скрыта организатором",
        },
        { status: 200 },
      );
    }

    // Читаем список ставок из динамического хранилища
    const bets = betsStore[auction.main.id] || [];

    return HttpResponse.json(
      {
        hideBetsHistory: false,
        participantsCount: bets.length,
        bets: bets,
      },
      { status: 200 },
    );
  }),

  // 5. POST /auctions/{auctionUuid}/bets — СОЗДАНИЕ СТАВКИ И МУТАЦИЯ ХРАНИЛИЩА
  http.post("/auctions/:auctionUuid/bets", async ({ params, request }) => {
    const targetUuid = String(params.auctionUuid);
    const auction = db.auctions.find(
      (a) =>
        a.main.order_uid === targetUuid || String(a.main.id) === targetUuid,
    );

    if (!auction) {
      return HttpResponse.json(
        { code: "NOT_FOUND", message: "Аукцион не найден" },
        { status: 404 },
      );
    }

    if (!auction.trading.can_set_bet) {
      return HttpResponse.json(
        { code: "FORBIDDEN", message: "Установка ставок запрещена" },
        { status: 403 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      amount: number;
      comment?: string;
      isCounter?: boolean;
    };

    const errors: Record<string, string> = {};
    if (!body.amount || body.amount <= 0) {
      errors.amount = "Сумма должна быть больше 0";
    }

    const minPrice = auction.trading.price?.min;
    const maxPrice = auction.trading.price?.max;

    if (minPrice != null && body.amount < minPrice) {
      errors.amount = `Ставка не может быть меньше минимальной (${minPrice})`;
    }
    if (maxPrice != null && body.amount > maxPrice) {
      errors.amount = `Ставка не может превышать максимальную (${maxPrice})`;
    }

    if (Object.keys(errors).length > 0) {
      return HttpResponse.json(
        { code: "VALIDATION_ERROR", errors },
        { status: 422 },
      );
    }

    // Создаем новую ставку
    const newBet: BetItem = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      auction_id: auction.main.id,
      subscriber_id: 999,
      contact_name: "Иван Иванов",
      contact_phone: "+7 (999) 000-00-00",
      price_with_vat: body.amount,
      price_no_vat: Math.round(body.amount / 1.2),
      organization_id: 500,
      organization_inn: "7700000000",
      organization_name: "Наша Перевозочная Компания (Вы)",
      transporter_comment: body.comment || null,
      is_rejected: false,
      is_counter: Boolean(body.isCounter),
      place: 1,
      is_win: false,
      run_number: 1,
      cancel_reason: "",
    };

    // 📌 Добавляем новую ставку в начало массива betsStore
    if (!betsStore[auction.main.id]) {
      betsStore[auction.main.id] = [];
    }
    betsStore[auction.main.id].unshift(newBet);

    // Обновляем агрегированное состояние аукциона в БД
    if (!auction.trading.price) {
      auction.trading.price = {
        start: body.amount,
        current: body.amount,
        current_no_vat: Math.round(body.amount / 1.2),
      };
    } else {
      auction.trading.price.current = body.amount;
      auction.trading.price.current_no_vat = Math.round(body.amount / 1.2);
    }

    auction.trading.is_bidder = true;
    auction.trading.status_mobile = "Leading";
    auction.trading.your = {
      bet: true,
      last_bet: body.amount,
      win: false,
    };

    return HttpResponse.json(newBet, { status: 201 });
  }),
];
