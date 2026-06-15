import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../../api/tags.api";
import { useAuth } from "@clerk/react";
import { useTags } from "./useTags";
import type { Task } from "../../schemas/task.schema";
import type { Note } from "../../schemas/note.schema";

export function useDeleteTag() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: tags } = useTags();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await deleteTag(token as string, id);
    },
    onSuccess: (_, id) => {
      const tag = tags?.find((s) => s.id === id);

      tag?.tasks.forEach((t: Task) => {
        queryClient.invalidateQueries({
          queryKey: ["task", "id", t.id],
        });
      });

      tag?.notes.forEach((n: Note) => {
        queryClient.invalidateQueries({
          queryKey: ["note", "id", n.id],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["tags"],
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
