import { NextFunction, Request, Response } from "express";
import { AppError } from "@/models";
import Jwt from "jsonwebtoken";
import { handleAppError } from "./error.middleware";

export function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(/\s/)[1];

    Jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, user) => {
      if (err) {
        return handleUnauthorized(req, res);
      }
      req.body.user = user;
      return next();
    });
  } else {
    return handleUnauthorized(req, res);
  }
}

function handleUnauthorized(req: Request, res: Response) {
  return handleAppError(req, res)(new AppError("Unauthorized request", 401));
}
