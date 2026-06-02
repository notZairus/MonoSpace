import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskDTO } from "@studybase/shared";
import { useAuth } from "@clerk/react";
import { createTask } from "../api/task";

export function useCreateTask() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (Task: TaskDTO) => {
      const token = await getToken();
      await createTask(token as string, Task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}
