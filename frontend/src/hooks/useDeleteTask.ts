import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/task.api";
import { useAuth } from "@clerk/react";
import { useTasks } from "./useTasks";
import type { Task } from "../schemas/task.schema";

export function useDeleteTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: tasks } = useTasks();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteTask(token as string, id);
    },
    onSuccess: (_, id) => {
      const task = (tasks as Task[]).find((t) => t.id === id);

      task?.subjects.forEach((sub) => {
        queryClient.invalidateQueries({
          queryKey: ["subject", "id", sub.id],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}
