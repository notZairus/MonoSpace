import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/task";
import { useAuth } from "@clerk/react";

export function useDeleteTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteTask(token as string, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
