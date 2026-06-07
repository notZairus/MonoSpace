import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import type { subjectDTO } from "../schemas/subject.schema";
import { updateSubject } from "../api/subject";

export function useUpdateSubject() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      field,
    }: {
      id: string;
      field: Partial<subjectDTO>;
    }) => {
      const token = await getToken();
      await updateSubject(
        token as string,
        id as string,
        field as Partial<subjectDTO>,
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
