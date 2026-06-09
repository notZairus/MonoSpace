import { useQuery } from "@tanstack/react-query";
import { type Subject } from "../schemas/subject.schema";
import { useAuth } from "@clerk/react";
import { getSubject, getSubjects } from "../api/subject.api";

export function useSubjects() {
  const { getToken } = useAuth();

  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return getSubjects(token as string);
    },
  });
}

export function useSubject(subjectId: string) {
  const { getToken } = useAuth();

  return useQuery<Subject>({
    queryKey: ["subject", "id", subjectId],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return getSubject(token as string, subjectId);
    },
  });
}
