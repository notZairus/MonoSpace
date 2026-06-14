import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/note.api";

export function useNotes() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["notes"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      const notes = await getNotes(token as string);
      return notes;
    },
  });
}
