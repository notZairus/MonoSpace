import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskDTO } from "../schemas/task.schema";
import { useAuth } from "@clerk/react";
import { createTask } from "../api/task.api";

export function useCreateTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskDTO) => {
      const token = await getToken();
      return await createTask(token as string, task);
    },
    onSuccess: (data: Task) => {
      data.subjects.forEach((sub) => {
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
