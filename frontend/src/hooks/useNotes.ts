import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data.notes;
    },
  });
}
