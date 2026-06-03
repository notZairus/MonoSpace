import { z } from "zod";
import { type Subtask } from "./subtask";

export const createTaskSchema = z.object({
  name: z.string().trim().min(4),
  description: z.string().optional(),
  color: z.enum(["red", "yellow", "green"]),
  subjects: z.array(z.string().min(3)).min(1),
  status: z.enum(["PENDING", "COMPLETED"]),
  deadline: z.string(),
});

export type TaskDTO = z.infer<typeof createTaskSchema>;

export type Task = Omit<TaskDTO, "subjects"> & {
  id: string;
  subjects: { id: string; name: string }[];
  subtasks?: Subtask[];
  parent?: Task;
};

export const updateTaskSchema = z.object({
  name: z.string().min(4).optional(),
  description: z.string().optional(),
  color: z.enum(["red", "yellow", "green"]).optional(),
  subjects: z.array(z.string().min(3)).min(1).optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
  deadline: z.string().optional(),
});
