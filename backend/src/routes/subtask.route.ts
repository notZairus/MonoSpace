import { Router } from "express";
import { createSubTaskSchema } from "../schemas/subtask.schema";
import { getAuth } from "@clerk/express";
import z from "zod";
import { prisma } from "../../prisma/client";

const router = Router();

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(403).send({ message: "Forbidden" });

  const result = createSubTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ error: z.treeifyError(result.error) });
  }

  const data = result.data;

  const subtask = await prisma.subtask.create({
    data: {
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

export default router;
