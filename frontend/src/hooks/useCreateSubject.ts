import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type subjectDTO } from "../schemas/subject.schema";
import { useAuth } from "@clerk/react";
import { createSubject } from "../api/subject.api";

export function useCreateSubject() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subject: subjectDTO) => {
      const token = await getToken();
      await createSubject(token as string, subject);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}
