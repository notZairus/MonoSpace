import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type TagDTO } from "../../schemas/tags.schema";
import { useAuth } from "@clerk/react";
import { createTag } from "../../api/tags.api";

export function useCreateTag() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tag: TagDTO) => {
      const token = await getToken();
      await createTag(token as string, tag);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
