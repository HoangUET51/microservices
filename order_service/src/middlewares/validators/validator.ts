import { AppError } from "@/models";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { handleAppError } from "../error.middleware";

export const validate =
  (validations: any[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return handleAppError(req, res)(new AppError(errors.array()[0].msg, 403));
  };
