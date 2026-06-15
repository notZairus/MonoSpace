import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { toggleCompleteTask } from "../../api/task.api";
import type { Task } from "../../schemas/task.schema";
import type { Tag } from "../../schemas/tags.schema";

export function useToggleCompleteTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      const data = await toggleCompleteTask(token as string, id);
      return data;
    },
    onSuccess: (data: Task, id: string) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["task", "id", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });

      data.tags?.forEach((tag: Tag) => {
        queryClient.invalidateQueries({
          queryKey: ["tag", "id", tag.id],
        });
      });
    },
  });
}
