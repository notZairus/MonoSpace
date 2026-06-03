import type { TaskDTO } from "@studybase/shared";

export async function get(token: string, status: string = "all") {
  const res = await fetch(`http://localhost:3000/api/tasks?status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.tasks;
}

export async function createTask(token: string, data: TaskDTO) {
  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function toggleCompleteTask(token: string, id: string) {
  await fetch(`http://localhost:3000/api/tasks/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateTask(
  token: string,
  id: string,
  data: Partial<TaskDTO>,
) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTask(token: string, id: string) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
