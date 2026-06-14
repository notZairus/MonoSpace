import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

export function authenticate(
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(403).send({
      message: "Forbidden",
    });
  }

  req.userId = userId;
  next();
}
