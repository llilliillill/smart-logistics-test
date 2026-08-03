import type { useForm } from "react-hook-form";
import type { PlaceBetFormValues } from "./createBidShema";

export async function createBidAction(
  id: string,
  values: PlaceBetFormValues,
  setError: ReturnType<typeof useForm<PlaceBetFormValues>>["setError"],
) {
  const res = await fetch(`/auctions/${id}/bets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: values.amount,
    }),
  });

  if (res.status === 422) {
    const errorData = await res.json();
    if (errorData.errors) {
      Object.entries(errorData.errors).forEach(([field, message]) => {
        setError(field as keyof PlaceBetFormValues, {
          type: "server",
          message: String(message),
        });
      });
    }
    throw new Error(errorData.message || "Ошибка валидации ставки");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Не удалось сделать ставку");
  }

  return res.json();
}
