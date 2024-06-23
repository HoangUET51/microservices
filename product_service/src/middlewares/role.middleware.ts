import { NextFunction, Request, Response } from "express";
import { AppError } from "@/models";
import { handleAppError } from "./error.middleware";

export function checkRolePermission(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    try {
      if (!user || !user.role) {
        throw "Permission error";
      }

      if (!roles.includes(user.role)) {
        throw "Permission error";
      }

      next();
    } catch {
      return handleAppError(req, res)(new AppError("Access Denied", 403));
    }
  };
}
