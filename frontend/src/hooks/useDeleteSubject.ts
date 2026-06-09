import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubject } from "../api/subject.api";
import { useAuth } from "@clerk/react";

export function useDeleteSubject() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteSubject(token as string, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
