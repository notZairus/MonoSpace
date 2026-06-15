import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeSubtask } from "../../api/subtask.api";

export function useToggleCompleteSubtask() {
  const query = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      const data = await completeSubtask(token as string, id);
      return data;
    },
    onSuccess: (data) => {
      query.invalidateQueries({
        queryKey: ["task", "id", data.subtask.parentId],
      });
    },
  });
}
