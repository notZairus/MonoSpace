import type { subjectDTO } from "../schemas/subject.schema";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function getSubjects(token: string) {
  const res = await fetch(`${serverUrl}/subjects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.subjects;
}

export async function getSubject(token: string, subjectId: string) {
  const res = await fetch(`${serverUrl}/subjects/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.subject;
}

export async function createSubject(token: string, subject: subjectDTO) {
  const res = await fetch(`${serverUrl}/subjects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subject),
  });

  const data = await res.json();
  return data.subject;
}

export async function updateSubject(
  token: string,
  subjectId: string,
  field: Partial<subjectDTO>,
) {
  const res = await fetch(`${serverUrl}/subjects/${subjectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(field),
  });

  const data = await res.json();
  return data.subject;
}

export async function deleteSubject(token: string, id: string) {
  await fetch(`${serverUrl}/subjects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
