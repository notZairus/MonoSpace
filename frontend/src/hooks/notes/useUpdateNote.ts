import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import type { Note, NoteDTO } from "../../schemas/note.schema";
import { updateNote } from "../../api/note.api";
import type { Tag } from "../../schemas/tags.schema";

export function useUpdateNote() {
  const { getToken } = useAuth();
  const query = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<NoteDTO>;
    }) => {
      const token = await getToken();
      const note = await updateNote(token as string, id, data);
      return note;
    },
    onSuccess: (data: Note) => {
      query.invalidateQueries({
        queryKey: ["notes"],
      });

      data.tags.forEach((t: Tag) => {
        query.invalidateQueries({
          queryKey: ["tag", "id", t.id],
        });
      });

      query.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
