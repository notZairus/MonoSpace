import { useQuery } from "@tanstack/react-query";
import { type Task } from "../schemas/task.schema";
import { useAuth } from "@clerk/react";
import { get } from "../api/task";

const serverUrl = import.meta.env.VITE_SERVER_URL;

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

      const res = await fetch(`${serverUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Good practice: Throw an error if the network request fails
      if (!res.ok) {
        throw new Error(`Failed to fetch task: ${res.statusText}`);
      }

      const data = await res.json();

      // 3. Ensure this matches your exact backend response structure
      return data.task;
    },
  });
}
