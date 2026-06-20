import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { updateSubtask } from "../../api/subtask.api";
import type { SubtaskDTO } from "../../schemas/subtask.schema";

export function useUpdateSubtask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<SubtaskDTO>;
    }) => {
      const token = await getToken();
      await updateSubtask(token as string, id, data);
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
