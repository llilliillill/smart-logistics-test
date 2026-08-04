import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type PlaceBetFormValues, placeBetSchema } from "./createBidShema";
import { createBidAction } from "./createBidAction";

export function useCreateBid(id: string) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlaceBetFormValues>({
    resolver: zodResolver(placeBetSchema()),
  });

  const placeBetMutation = useMutation({
    mutationFn: (values: PlaceBetFormValues) =>
      createBidAction(id, values, setError),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bets", id] });
      queryClient.invalidateQueries({ queryKey: ["auction", id] });
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    },
  });

  const onSubmit = (data: PlaceBetFormValues) => {
    placeBetMutation.mutate(data);
  };

  return {
    isPending: placeBetMutation.isPending,
    register,
    handleSubmit,
    setError,
    reset,
    errors,
    isSubmitting,
    onSubmit,
  };
}
