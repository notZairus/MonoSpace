import { Router } from "express";
import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "../../prisma/client";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../schemas/subject.schema";
import z from "zod";

const router = Router();

router.get("/:subjectId", async (req: Request, res: Response) => {
  console.log("trugff");
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const { subjectId } = req.params;

  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId as string,
    },
    include: {
      tasks: {
        include: {
          subjects: true,
          subtasks: true,
        },
      },
    },
  });

  return res.status(200).send({ subject });
});

router.get("/", async (req: Request, res: Response) => {
  console.log("hulullll");
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const subjects = await prisma.subject.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      tasks: {
        include: {
          subjects: true,
          subtasks: true,
        },
      },
    },
  });

  return res.status(200).send({ subjects });
});

router.post("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const result = createSubjectSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({
      errors: z.treeifyError(result.error),
    });
  }

  const data = result.data;

  const subject = await prisma.subject.create({
    data: {
      userId: userId as string,
      name: data.name,
    },
  });

  return res.status(200).send({ subject });
});

router.patch("/:subjectId", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const result = updateSubjectSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({
      errors: z.treeifyError(result.error),
    });
  }

  const { subjectId } = req.params;

  const data = result.data;

  const subject = await prisma.subject.update({
    where: {
      id: subjectId as string,
      userId: userId as string,
    },
    data: {
      ...data,
    },
  });

  return res.status(200).send({
    subject,
  });
});

router.delete("/:subjectId", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const { subjectId } = req.params;

  await prisma.subject.delete({
    where: {
      id: subjectId as string,
    },
  });

  await prisma.task.deleteMany({
    where: {
      userId: userId as string,
      subjects: {
        none: {},
      },
    },
  });

  return res.status(200).send({ message: "successful" });
});

export default router;
