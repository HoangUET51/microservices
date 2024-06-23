import { CODE_COMMON_FAILED } from "@/constants/common.const";

class AppError extends Error {
  public code: number;
  public message: string;
  public baCode: number;

  constructor(message: string, code = 500, baCode = CODE_COMMON_FAILED) {
    super();
    this.code = code;
    this.message = message;
    this.baCode = baCode;
  }
}

class ManagedError {
  public origin: string;
  public error: unknown;

  constructor(origin: string, error: unknown) {
    this.origin = origin;
    this.error = error;
  }
}

export { AppError, ManagedError };
