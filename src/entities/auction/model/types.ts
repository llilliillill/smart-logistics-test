export type AuctionType = "Request" | "Up" | "Down" | "FixPrice";

export type AuctionStatus =
  | "Planning"
  | "Auction"
  | "DeterminateWinner"
  | "WaitDeal"
  | "InProgress"
  | "Finished"
  | "Stopped"
  | "Canceled";

export type TradingStatus =
  | "NotParticipating"
  | "Leading"
  | "Losing"
  | "OnPending"
  | "Confirmed"
  | "ChoosingWinner"
  | "Winner"
  | "Accepted";

export type CurrencyCode = "RUB" | "EUR" | "USD";

export interface Filters {
  load_city?: string;
  unload_city?: string;
  cargo_num?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  auc_type?: string;
  price_from?: number;
  price_to?: number;
  is_bidder?: boolean;
  is_available?: boolean;
}

export interface AuctionMain {
  id: number;
  cargo_num: string;
  cargo_date: string;
  auc_type: AuctionType;
  order_uid: string;
  created_at: string;
  priority_sort: number;
  is_assembly: boolean;
  price_per_km: number;
}

export interface AuctionOrganizer {
  subscriber_id: number;
  organization_id: number;
  organization_name: string;
  organization_inn: string;
  organization_kpp: string;
  is_hide_organization: boolean;
}

export interface AuctionRoute {
  load: {
    city: string;
    address: string;
    date: string;
    city_gc_id: number;
    points_count: number;
  };
  unload: {
    city: string;
    address: string;
    date: string;
    city_gc_id: number;
    points_count: number;
  };
}

export interface AuctionRoutes {
  row_num: number;
  op_type: string;
  start_date: string;
  end_date: string;
  comment: string;
  location: {
    city_name: string;
    city_full_name: string;
    city_gc_id: number;
    loading_address: string;
    lon: number;
    lat: number;
  };
}

export interface AuctionCargo {
  name: string;
  weight: number;
  volume: number;
  body_type: string;
  truck_count: number;
  is_cargo: boolean;
  loading_types: {
    side: boolean;
    top: boolean;
    rear: boolean;
    full: boolean;
  };
  docs: {
    tir: boolean;
    cmr: boolean;
    t1: boolean;
    med: boolean;
  };
}

export interface AuctionTrading {
  status: AuctionStatus;
  status_mobile: TradingStatus;
  start_time: string;
  stop_time: string;
  bid_measurement_type: string;
  can_set_bet: boolean;
  allow_counter_bets: boolean;
  hide_points_address_and_contacts: boolean;
  is_bidder: boolean;
  is_available: boolean;
  is_accredited: boolean;
  is_favorite: boolean;
  price: {
    start: number;
    current: number;
    current_no_vat: number;
    step: number;
  };
  your: {
    bet: boolean;
    last_bet: number;
    win: boolean;
  };
}

export interface AuctionPayment {
  form: string;
  currency_code: CurrencyCode;
  delay: number;
}

export interface Auction {
  main: AuctionMain;
  organizer: AuctionOrganizer;
  route: AuctionRoute;
  routes: AuctionRoutes[];
  cargo: AuctionCargo;
  trading: AuctionTrading;
  payment: AuctionPayment;
}
