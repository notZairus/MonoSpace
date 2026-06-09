import { useQuery } from "@tanstack/react-query";
import { type Task } from "../schemas/task.schema";
import { useAuth } from "@clerk/react";
import { get, getTask } from "../api/task.api";

export function useTasks(status: string = "all") {
  const { getToken } = useAuth();

  return useQuery<Task[]>({
    queryKey: ["tasks", "status", status],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return get(token as string, status);
    },
  });
}

export function useTask(taskId: string) {
  const { getToken } = useAuth();

  return useQuery<Task>({
    queryKey: ["task", "id", taskId],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return await getTask(token as string, taskId);
    },
  });
}
