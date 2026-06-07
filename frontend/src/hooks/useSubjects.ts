import { useQuery } from "@tanstack/react-query";
import { type Subject } from "../schemas/subject.schema";
import { useAuth } from "@clerk/react";
import { getSubjects } from "../api/subject";

const serverUrl = import.meta.env.VITE_SERVER_URL;

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

      const res = await fetch(`${serverUrl}/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data.subject;
    },
  });
}
