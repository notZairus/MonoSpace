import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import type { NoteDTO } from "../../schemas/note.schema";
import { createNote } from "../../api/note.api";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateNote() {
  const { getToken } = useAuth();
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (noteData: NoteDTO) => {
      const token = await getToken();
      const note = await createNote(token as string, noteData);
      return note;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["notes"],
      });
      query.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
