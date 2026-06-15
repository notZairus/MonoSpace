import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { useNotes } from "./useNotes";
import type { Note } from "../../schemas/note.schema";
import { deleteNote } from "../../api/note.api";
import type { Tag } from "../../schemas/tags.schema";

export function useDeleteNote() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: notes } = useNotes();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteNote(token as string, id);
    },
    onSuccess: (_, id) => {
      const note = (notes as Note[]).find((n) => n.id === id);

      note?.tags.forEach((tag: Tag) => {
        queryClient.invalidateQueries({
          queryKey: ["tag", "id", tag.id],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
