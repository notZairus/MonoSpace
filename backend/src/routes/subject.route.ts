import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../schemas/subject.schema";
import z from "zod";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/:subjectId", authenticate, async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId as string,
    },
    include: {
      notes: true,
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

router.get("/", authenticate, async (req: Request, res: Response) => {
  const { userId } = req;

  const subjects = await prisma.subject.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      notes: true,
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

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { userId } = req;

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

router.patch(
  "/:subjectId",
  authenticate,
  async (req: Request, res: Response) => {
    const { userId } = req;

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
  },
);

router.delete(
  "/:subjectId",
  authenticate,
  async (req: Request, res: Response) => {
    const { userId } = req;

    const { subjectId } = req.params;

    await prisma.subject.delete({
      where: {
        id: subjectId as string,
      },
    });

    return res.status(200).send({ message: "successful" });
  },
);

export default router;
