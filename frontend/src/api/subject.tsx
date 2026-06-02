export async function getSubjects(token: string) {
  const endpoint = `http://localhost:3000/api/subjects`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.subjects;
}
