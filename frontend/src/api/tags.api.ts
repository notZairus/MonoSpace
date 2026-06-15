import type { TagDTO } from "../schemas/tags.schema";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function getTags(token: string) {
  const res = await fetch(`${serverUrl}/tags`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.tags;
}

export async function getTag(token: string, id: string) {
  const res = await fetch(`${serverUrl}/tags/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.tag;
}

export async function createTag(token: string, tag: TagDTO) {
  const res = await fetch(`${serverUrl}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  });

  const data = await res.json();
  return data.tag;
}

export async function updateTag(
  token: string,
  id: string,
  field: Partial<TagDTO>,
) {
  const res = await fetch(`${serverUrl}/tags/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(field),
  });

  const data = await res.json();
  return data.tag;
}

export async function deleteTag(token: string, id: string) {
  await fetch(`${serverUrl}/tags/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
