import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import type { TagDTO } from "../../schemas/tags.schema";
import { updateTag } from "../../api/tags.api";

export function useUpdateTag() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      field,
    }: {
      id: string;
      field: Partial<TagDTO>;
    }) => {
      const token = await getToken();
      await updateTag(token as string, id as string, field as Partial<TagDTO>);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
