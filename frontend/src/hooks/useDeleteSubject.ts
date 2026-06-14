import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubject } from "../api/subject.api";
import { useAuth } from "@clerk/react";
import { useSubjects } from "./useSubjects";

export function useDeleteSubject() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: subjects } = useSubjects();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteSubject(token as string, id);
    },
    onSuccess: (_, id) => {
      const subject = subjects?.find((s) => s.id === id);

      subject?.tasks.forEach((t) => {
        queryClient.invalidateQueries({
          queryKey: ["task", "id", t.id],
        });
      });

      subject?.notes.forEach((n) => {
        queryClient.invalidateQueries({
          queryKey: ["note", "id", n.id],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}
