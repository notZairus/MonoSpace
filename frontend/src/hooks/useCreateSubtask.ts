import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubtaskDTO } from "../schemas/subtask.schema";
import { useAuth } from "@clerk/react";
import { createSubtask } from "../api/subtask";

export function useCreateSubtask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subtask: SubtaskDTO) => {
      const token = await getToken();
      await createSubtask(token as string, subtask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
