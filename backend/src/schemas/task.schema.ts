import { z } from "zod";
import { type Subtask } from "./subtask.schema";
import type { Tag } from "./tags.schema";

export const createTaskSchema = z.object({
  name: z
    .string({
      error: "Task name is required",
    })
    .trim()
    .min(1, "Task name is required")
    .min(4, "Task name must be at least 4 characters long"),

  description: z.string().optional(),

  color: z.enum(["red", "yellow", "green"], {
    error: "Please select a valid task color",
  }),

  tags: z.array(z.string().trim().min(1, "Tag cannot be empty")).optional(),

  status: z.enum(["PENDING", "COMPLETED"], {
    error: "Please select a valid task status",
  }),

  deadline: z
    .string({
      error: "Deadline is required",
    })
    .min(1, "Deadline is required"),
});

export type TaskDTO = z.infer<typeof createTaskSchema>;

export type Task = Omit<TaskDTO, "tags"> & {
  id: string;
  tags: Tag[];
  subtasks?: Subtask[];
  parent?: Task;
};

export const updateTaskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Task name cannot be empty")
    .min(4, "Task name must be at least 4 characters long")
    .optional(),

  description: z.string().optional(),

  color: z
    .enum(["red", "yellow", "green"], {
      error: "Please select a valid task color",
    })
    .optional(),

  tags: z.array(z.string().trim().min(1, "Tag cannot be empty")).optional(),

  status: z
    .enum(["PENDING", "COMPLETED"], {
      error: "Please select a valid task status",
    })
    .optional(),

  deadline: z.string().min(1, "Deadline cannot be empty").optional(),
});
