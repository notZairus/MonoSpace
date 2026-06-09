import type { TaskDTO } from "../schemas/task.schema";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function get(token: string, status: string = "all") {
  const res = await fetch(`${serverUrl}/tasks?status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.tasks;
}

export async function getTask(token: string, taskId: string) {
  const res = await fetch(`${serverUrl}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 2. Good practice: Throw an error if the network request fails
  if (!res.ok) {
    throw new Error(`Failed to fetch task: ${res.statusText}`);
  }

  const data = await res.json();

  // 3. Ensure this matches your exact backend response structure
  return data.task;
}

export async function createTask(token: string, data: TaskDTO) {
  await fetch(`${serverUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function toggleCompleteTask(token: string, id: string) {
  const res = await fetch(`${serverUrl}/tasks/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}

export async function updateTask(
  token: string,
  id: string,
  data: Partial<TaskDTO>,
) {
  await fetch(`${serverUrl}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTask(token: string, id: string) {
  await fetch(`${serverUrl}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
