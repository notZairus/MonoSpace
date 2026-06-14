import { Request, Response, Router } from "express";
import upload from "../lib/upload";
import fs from "fs";
import { exec } from "child_process";
import { createNoteSchema, updateNoteSchema } from "../schemas/note.schema";
import { z } from "zod";
import { prisma } from "../../prisma/client";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const { userId } = req;

  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    include: {
      subjects: true,
    },
  });

  return res.status(200).send({
    notes: notes,
  });
});

router.post("/", authenticate, async (req, res) => {
  const { userId } = req;

  const result = createNoteSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(z.treeifyError(result.error));
  }

  const data = result.data;

  const newNote = await prisma.note.create({
    data: {
      userId: userId as string,
      title: data.title,
      content: data.content as string,
      subjects: {
        connectOrCreate: data.subjects.map((sub) => ({
          where: {
            userId_name: {
              userId: userId as string,
              name: sub,
            },
          },
          create: {
            userId: userId as string,
            name: sub,
          },
        })),
      },
    },
  });

  return res.status(201).send({
    note: newNote,
  });
});

router.post(
  "/extract",
  authenticate,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const fileToExtract = req.file;

    if (!fileToExtract) {
      return res.sendStatus(400);
    }

    const output: string = await new Promise((resolve, rejects) => {
      exec(
        `curl -T ${fileToExtract.path} http://localhost:9998/tika/text`,
        (err, stdout, stderr) => {
          if (err) {
            console.error("curl error:", err);
            rejects(err);
          }

          fs.unlink(fileToExtract.path, (err) => {});

          resolve(stdout);
        },
      );
    });

    const extractedText = output.trimStart().trimEnd().split("   ").join("");

    // const aiOutput = await makeCleanMarkdown(extractedText);
    // console.log(aiOutput);

    // TODO: temporary because i ran out of ai limits
    return res.json({
      title: "Note Title",
      content: extractedText,
    });
  },
);

router.patch("/:noteId", authenticate, async (req, res) => {
  const { userId } = req;

  const { noteId } = req.params;
  if (!noteId) return res.sendStatus(400);

  const result = updateNoteSchema.safeParse(req.body);

  if (!result.success)
    return res.status(400).json(z.treeifyError(result.error));

  const { subjects, ...rest } = result.data;

  const note = await prisma.note.update({
    where: { id: noteId as string },
    data: {
      ...rest,
      ...(subjects !== undefined && {
        subjects: {
          set: [],
          connectOrCreate: subjects.map((sub) => ({
            where: {
              userId_name: {
                userId: userId as string,
                name: sub,
              },
            },
            create: { userId: userId as string, name: sub },
          })),
        },
      }),
    },
    include: {
      subjects: true,
    },
  });

  return res.status(200).send({
    note: note,
  });
});

router.delete("/:noteId", authenticate, async (req, res) => {
  const { noteId } = req.params;

  await prisma.note.delete({
    where: {
      id: noteId as string,
    },
  });

  return res.status(200).send({ message: "successful" });
});

export default router;
