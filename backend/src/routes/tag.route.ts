import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { createTagSchema, updateTagSchema } from "../schemas/tags.schema";
import z from "zod";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/:tagId", authenticate, async (req: Request, res: Response) => {
  const { tagId } = req.params;

  const tag = await prisma.tag.findFirst({
    where: {
      id: tagId as string,
    },
    include: {
      notes: {
        include: {
          tags: true,
        },
      },
      tasks: {
        include: {
          tags: true,
          subtasks: true,
        },
      },
    },
  });

  return res.status(200).send({ tag });
});

router.get("/", authenticate, async (req: Request, res: Response) => {
  const { userId } = req;

  const tags = await prisma.tag.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      notes: {
        include: {
          tags: true,
        },
      },
      tasks: {
        include: {
          tags: true,
          subtasks: true,
        },
      },
    },
  });

  return res.status(200).send({ tags });
});

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { userId } = req;

  const result = createTagSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({
      errors: z.treeifyError(result.error),
    });
  }

  const data = result.data;

  const tag = await prisma.tag.create({
    data: {
      userId: userId as string,
      name: data.name,
    },
  });

  return res.status(200).send({ tag });
});

router.patch("/:tagId", authenticate, async (req: Request, res: Response) => {
  const { userId } = req;

  const result = updateTagSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({
      errors: z.treeifyError(result.error),
    });
  }

  const { tagId } = req.params;

  const data = result.data;

  const tag = await prisma.tag.update({
    where: {
      id: tagId as string,
      userId: userId as string,
    },
    data: {
      ...data,
    },
  });

  return res.status(200).send({
    tag,
  });
});

router.delete("/:tagId", authenticate, async (req: Request, res: Response) => {
  const { userId } = req;

  const { tagId } = req.params;

  await prisma.tag.delete({
    where: {
      id: tagId as string,
    },
  });

  return res.status(200).send({ message: "successful" });
});

export default router;
