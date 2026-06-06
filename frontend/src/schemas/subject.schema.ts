import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().trim().min(4),
});

export type subjectDTO = z.infer<typeof createSubjectSchema>;

export type Subject = subjectDTO & {
  id: string;
  userId: string;
};
