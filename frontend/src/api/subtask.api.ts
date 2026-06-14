import type { SubtaskDTO } from "../schemas/subtask.schema";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function createSubtask(token: string, subtask: SubtaskDTO) {
  const res = await fetch(`${serverUrl}/subtasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subtask),
  });

  const data = await res.json();
  return data.subtask;
}

export async function completeSubtask(token: string, id: string) {
  const res = await fetch(`${serverUrl}/subtasks/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}

// TODO: update and delete subtask
