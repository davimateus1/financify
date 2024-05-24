import { toast } from "sonner";
import { client } from "@/lib/hono";

import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria deletada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      // TODO: Validate Summary and Transactions
    },
    onError: () => {
      toast.error("Erro ao deletar a categoria, tente novamente mais tarde");
    },
  });

  return mutation;
};
