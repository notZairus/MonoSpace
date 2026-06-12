import type { NoteDTO } from "../schemas/note.schema";

export async function extractTextFromDocument(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:3000/api/notes/extract", {
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
  const res = await fetch("http://localhost:3000/api/notes", {
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
