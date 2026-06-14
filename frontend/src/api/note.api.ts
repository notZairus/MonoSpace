import type { NoteDTO } from "../schemas/note.schema";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function extractTextFromDocument(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${serverUrl}/notes/extract`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
}

export async function createNote(token: string, noteData: NoteDTO) {
  const res = await fetch(`${serverUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noteData),
  });

  const data = await res.json();
  return data.note;
}

export async function deleteNote(token: string, id: string) {
  await fetch(`${serverUrl}/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getNotes(token: string) {
  const res = await fetch(`${serverUrl}/notes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.notes;
}

export async function updateNote(
  token: string,
  id: string,
  data: Partial<NoteDTO>,
) {
  const res = await fetch(`${serverUrl}/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData.note;
}
