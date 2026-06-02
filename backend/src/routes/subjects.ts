import { Router } from "express";
import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "../prisma/client";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const subjects = await prisma.subject.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      tasks: true,
    },
  });

  return res.status(200).send({ subjects });
});

export default router;
