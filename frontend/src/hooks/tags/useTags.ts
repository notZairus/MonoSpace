import { useQuery } from "@tanstack/react-query";
import { type Tag } from "../../schemas/tags.schema";
import { useAuth } from "@clerk/react";
import { getTag, getTags } from "../../api/tags.api";

export function useTags() {
  const { getToken } = useAuth();

  return useQuery<Tag[]>({
    queryKey: ["tags"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return getTags(token as string);
    },
  });
}

export function useTag(id: string) {
  const { getToken } = useAuth();

  return useQuery<Tag>({
    queryKey: ["tag", "id", id],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return getTag(token as string, id);
    },
  });
}
