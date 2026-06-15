import { z } from "zod";
import type { Task } from "./task.schema";

export const createSubTaskSchema = z.object({
  parentId: z
    .string({
      error: "Parent task is required",
    })
    .min(1, "Parent task is required"),

  name: z
    .string({
      error: "Subtask name is required",
    })
    .trim()
    .min(1, "Subtask name is required")
    .min(4, "Subtask name must be at least 4 characters long"),

  description: z.string().optional(),

  color: z.enum(["red", "yellow", "green"], {
    error: "Please select a valid subtask color",
  }),

  status: z.enum(["PENDING", "COMPLETED"], {
    error: "Please select a valid subtask status",
  }),
});

export type SubtaskDTO = z.infer<typeof createSubTaskSchema>;

export type Subtask = Omit<SubtaskDTO, "subjects"> & {
  id: string;
  parent?: Task;
};
