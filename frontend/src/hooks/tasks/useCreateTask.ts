import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskDTO } from "../../schemas/task.schema";
import { useAuth } from "@clerk/react";
import { createTask } from "../../api/task.api";
import type { Tag } from "../../schemas/tags.schema";

export function useCreateTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskDTO) => {
      const token = await getToken();
      return await createTask(token as string, task);
    },
    onSuccess: (data: Task) => {
      data.tags.forEach((tag: Tag) => {
        queryClient.invalidateQueries({
          queryKey: ["tag", "id", tag.id],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
