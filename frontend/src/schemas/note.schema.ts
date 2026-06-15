import { z } from "zod";
import type { Tag } from "./tags.schema";

export const createNoteSchema = z.object({
  title: z
    .string({
      error: "Title is required",
    })
    .trim()
    .min(3, "Title must be at least 3 characters long"),

  tags: z.array(z.string().trim().min(1, "Tag cannot be empty")).optional(),

  content: z.string().optional(),
});

export type NoteDTO = z.infer<typeof createNoteSchema>;

export type Note = Omit<NoteDTO, "tags"> & {
  id: string;
  userId?: string;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export const updateNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .optional(),

  tags: z.array(z.string().trim().min(1, "Tag cannot be empty")).optional(),

  content: z.string().optional(),
});
