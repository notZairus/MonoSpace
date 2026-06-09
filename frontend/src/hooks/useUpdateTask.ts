import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { updateTask } from "../api/task.api";
import type { Task, TaskDTO } from "../schemas/task.schema";
import { useTasks } from "./useTasks";

export function useUpdateTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: upcommingTask } = useTasks();
  const { data: overdueTasks } = useTasks("overdue");
  const { data: completedTasks } = useTasks("completed");

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<TaskDTO>;
    }) => {
      const token = await getToken();
      await updateTask(token as string, id, data);
    },
    onSuccess: (_, data) => {
      const task = [
        ...(upcommingTask as Task[]),
        ...(overdueTasks as Task[]),
        ...(completedTasks as Task[]),
      ].find((t) => t.id === data.id);

      task?.subjects.forEach((s) => {
        console.log(s);
        queryClient.invalidateQueries({
          queryKey: ["subject", "id", s.id],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", "status", "overdue"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", "status", "completed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["task", "id", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}
