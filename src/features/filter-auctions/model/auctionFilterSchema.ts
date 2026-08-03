import { z } from "zod";

export const auctionFiltersSchema = z.object({
  page: z.number().optional().default(1),
  cargo_num: z.string().optional().catch(""),
  status: z.string().optional().catch(""),
  statuses: z.array(z.string()).optional().catch([]),
  auc_type: z
    .enum(["Request", "Up", "Down", "FixPrice"])
    .or(z.string())
    .optional()
    .catch(""),
  load_city: z.string().optional().catch(""),
  unload_city: z.string().optional().catch(""),
  date_from: z.string().optional().catch(""),
  date_to: z.string().optional().catch(""),
  is_available: z.boolean().optional().catch(undefined),
  is_bidder: z.boolean().optional().catch(undefined),
  price_from: z.number().positive().optional().catch(undefined),
  price_to: z.number().positive().optional().catch(undefined),
});

export type AuctionFilters = z.infer<typeof auctionFiltersSchema>;
