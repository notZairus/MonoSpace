import { Router } from "express";
import { createSubTaskSchema } from "../schemas/subtask.schema";
import z from "zod";
import { prisma } from "../../prisma/client";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  const { userId } = req;
  const result = createSubTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ error: z.treeifyError(result.error) });
  }

  const data = result.data;

  const subtask = await prisma.subtask.create({
    data: {
      userId: userId as string,
      parentId: data.parentId,
      name: data.name,
      status: data.status,
      description: data.description,
      color: data.color,
    },
  });

  return res.status(201).send({
    message: "created.",
    subtask,
  });
});

router.patch(`/:subtaskId/status`, authenticate, async (req, res) => {
  const { subtaskId } = req.params;
  if (!subtaskId) return res.sendStatus(400);

  const targetSubtask = await prisma.subtask.findFirst({
    where: {
      id: subtaskId as string,
    },
  });

  if (!targetSubtask) return res.sendStatus(404);

  const updated = await prisma.subtask.update({
    where: {
      id: subtaskId as string,
    },
    data: {
      status: targetSubtask.status === "COMPLETED" ? "PENDING" : "COMPLETED",
    },
  });

  return res.status(200).send({
    subtask: updated,
  });
});

export default router;
