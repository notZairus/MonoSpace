import { Request, Router, Response } from "express";
import {
  createTaskSchema,
  Task,
  updateTaskSchema,
} from "../schemas/task.schema";
import { z } from "zod";
import { getAuth } from "@clerk/express";
import { prisma } from "../../prisma/client";

const router = Router();

// GET ///////////////////////////////////////////////

router.get("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const { status } = req.query;

  const where: any = { userId };

  if (status === "overdue") {
    where.deadline = { lt: new Date() };
    where.completedAt = null;
  } else if (status === "completed") {
    where.completedAt = { not: null };
  } else {
    const today = new Date();
    where.deadline = { gte: today };
  }

  const tasks = await prisma.task.findMany({
    where,
    include: {
      subjects: true,
      subtasks: true,
    },
  });

  return res.status(200).send({ tasks });
});

router.get("/:taskId", async (req: Request, res: Response) => {
  console.log("get single task");

  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const { taskId } = req.params;

  if (taskId) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId as string,
        userId: userId as string,
      },
      include: {
        subjects: true,
        subtasks: true,
      },
    });

    return res.status(200).send({ task });
  }
});

// POST //////////////////////////////////////////////

router.post("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(403).send({
      message: "Forbidden",
    });
  }

  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(z.treeifyError(result.error));
  }

  const data: z.infer<typeof createTaskSchema> = result.data;

  const newTask = await prisma.task.create({
    data: {
      userId: userId,
      name: data.name,
      description: data.description,
      status: data.status,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      color: data.color,
      subjects: {
        connectOrCreate: data.subjects.map((sub) => ({
          where: {
            userId_name: {
              userId,
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
    message: "created.",
    task: newTask,
  });
});

// PATCH /////////////////////////////////////////////

router.patch("/:taskId/status", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(403).send({
      message: "Forbidden",
    });
  }

  const { taskId } = req.params;

  const targetTask = await prisma.task.findFirst({
    where: { id: taskId as string },
  });

  if (!targetTask) {
    return res.sendStatus(404);
  }

  await prisma.task.update({
    where: {
      id: taskId as string,
    },
    data: {
      status: targetTask.status === "PENDING" ? "COMPLETED" : "PENDING",
      completedAt: targetTask.status === "PENDING" ? new Date() : null,
    },
  });

  const task = await prisma.task.findFirst({
    where: {
      id: taskId as string,
    },
    include: {
      subjects: true,
    },
  });

  return res.status(200).send(task);
});

router.patch("/:taskId", async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const { taskId } = req.params;

  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(z.treeifyError(result.error));
  }

  const { subjects, ...rest } = result.data;

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...rest,
      ...(subjects !== undefined && {
        subjects: {
          set: [],
          connectOrCreate: subjects.map((sub) => ({
            where: {
              userId_name: {
                userId,
                name: sub,
              },
            },
            create: { userId, name: sub },
          })),
        },
      }),
    },
  });

  return res.status(200).send({
    task: task,
  });
});

// DELETE ////////////////////////////////////////////
router.delete("/:taskId", async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const { taskId } = req.params;

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return res.status(200).send({ message: "successful" });
});

export default router;
