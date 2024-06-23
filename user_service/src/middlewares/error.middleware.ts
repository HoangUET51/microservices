import { CODE_COMMON_FAILED } from "@/constants/common.const";
import LogHelper from "@/helpers/log.helper";
import { AppError } from "@/models";
import { Request, Response } from "express";
import { TypeORMError } from "typeorm";

/**
 * Handle `AppError` instance error
 */
export function handleAppError(req: Request, res: Response) {
  return (error: AppError) => {
    const { baCode, message } = error;
    LogHelper.logAppErrorRequest(req)(baCode, message);

    res.status(error.code).json({
      code: baCode,
      result: null,
      message: message,
    });
  };
}

/**
 * Handle non-`AppError` error types
 */
export function handleError(req: Request, res: Response) {
  return (error: any) => {
    let errorMsg = "";
    if (typeof error === "string") {
      errorMsg = error;
    } else if (error && typeof error === "object") {
      let errorStr = error.toString();
      // Prevent unhelpful error log
      if (!errorStr || errorStr === "[object Object]") {
        errorStr = JSON.stringify(error);
      }
      // Check if error stack trace exists
      if (error.stack) {
        errorStr += `\n  Stack Trace: ${error.stack}`;
      }
      // Check if `type-orm` error
      if (error instanceof TypeORMError) {
        errorStr += `\n  TypeORM: ${error.message}`;
      }
      errorMsg = errorStr;
    } else {
      errorMsg = "Unknown server error";
    }
    LogHelper.logErrorRequest(req)(errorMsg);

    res.status(500).json({
      code: CODE_COMMON_FAILED,
      result: null,
      message: "Server Error.",
    });
  };
}
