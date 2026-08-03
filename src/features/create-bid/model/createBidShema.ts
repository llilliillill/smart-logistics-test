import { z } from "zod";

export const placeBetSchema = () =>
  z.object({
    amount: z
      .number({
        invalid_type_error: "Введите корректное число",
      })
      .positive("Сумма должна быть больше 0"),
  });

export type PlaceBetFormValues = z.infer<ReturnType<typeof placeBetSchema>>;
