import { z } from "zod";

export const placeBetSchema = () =>
  z.object({
    amount: z.number({
      message: "Некорректная ставка",
    }),
  });

export type PlaceBetFormValues = z.infer<ReturnType<typeof placeBetSchema>>;
