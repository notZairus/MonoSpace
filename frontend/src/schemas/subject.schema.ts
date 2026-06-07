import { z } from "zod";
import type { Task } from "./task.schema";

export const createSubjectSchema = z.object({
  name: z.string().trim().min(4),
});

export type subjectDTO = z.infer<typeof createSubjectSchema>;

export type Subject = subjectDTO & {
  id: string;
  userId: string;
  tasks: Task[];
};

export const updateSubjectSchema = z.object({
  name: z.string().trim().optional(),
});

export type UpdateSubjectDTO = z.infer<typeof updateSubjectSchema>;
