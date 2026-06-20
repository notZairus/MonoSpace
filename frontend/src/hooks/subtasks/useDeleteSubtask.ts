import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubtask } from "../../api/subtask.api";
import { useAuth } from "@clerk/react";

export function useDeleteSubtask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteSubtask(token as string, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
