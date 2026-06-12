import { Request, Response, Router } from "express";
import upload from "../lib/upload";
import fs from "fs";
import { exec } from "child_process";
import { makeCleanMarkdown } from "../lib/ai";
import { getAuth } from "@clerk/express";
import { createNoteSchema } from "../schemas/note.schema";
import { z } from "zod";
import { prisma } from "../../prisma/client";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(403).send({ message: "Forbidden " });

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

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(403).send({ message: "Forbidden" });

  const result = createNoteSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(z.treeifyError(result.error));
  }

  const data = result.data;

  const newNote = await prisma.note.create({
    data: {
      userId: userId,
      title: data.title,
      content: data.content as string,
      subjects: {
        connectOrCreate: data.subjects.map((sub) => ({
          where: {
            userId_name: {
              userId: userId,
              name: sub,
            },
          },
          create: {
            userId,
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
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    if (!userId) return res.status(403).send({ message: "Forbidden" });

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

export default router;
