import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base";

class _AuthController extends BaseController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      this.success(req, res)({ user: "order" });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const AuthController = new _AuthController("AUTH_CONTROLLER");
export default AuthController;
