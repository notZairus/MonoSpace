import { z } from "zod";
import type { Task } from "./task.schema";

export const createSubTaskSchema = z.object({
  parentId: z.string(),
  name: z.string().trim().min(4),
  description: z.string().optional(),
  color: z.enum(["red", "yellow", "green"]),
  status: z.enum(["PENDING", "COMPLETED"]),
});

export type SubtaskDTO = z.infer<typeof createSubTaskSchema>;

export type Subtask = Omit<SubtaskDTO, "subjects"> & {
  id: string;
  parent?: Task;
};
