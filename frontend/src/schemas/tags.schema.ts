import { z } from "zod";
import type { Task } from "./task.schema";
import type { Note } from "./note.schema";

export const createTagSchema = z.object({
  name: z
    .string({
      error: "Tag name is required",
    })
    .trim()
    .min(1, "Tag name is required")
    .min(4, "Tag name must be at least 4 characters long"),
});

export type TagDTO = z.infer<typeof createTagSchema>;

export type Tag = TagDTO & {
  id: string;
  userId: string;
  tasks: Task[];
  notes: Note[];
};

export const updateTagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tag name cannot be empty")
    .min(4, "Tag name must be at least 4 characters long")
    .optional(),
});

export type UpdateTagDTO = z.infer<typeof updateTagSchema>;
