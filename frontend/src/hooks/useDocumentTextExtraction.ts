import { useMutation } from "@tanstack/react-query";
import { extractTextFromDocument } from "../api/note.api";
import { useAuth } from "@clerk/react";

export function useDocumentTextExtraction() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (file: File) => {
      const token = await getToken();
      const data = await extractTextFromDocument(token as string, file);
      return data;
    },
  });
}
