import { useQuery } from "@tanstack/react-query";
import { type Task } from "@studybase/shared";
import { useAuth } from "@clerk/react";
import { get } from "../api/task";

export function useTasks(status: string = "all") {
  const { getToken } = useAuth();

  return useQuery<Task[]>({
    queryKey: ["tasks", status],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return get(token as string, status);
    },
  });
}
