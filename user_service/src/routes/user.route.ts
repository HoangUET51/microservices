import AuthController from "@/controllers/user.controller";
import express from "express";

const router = express.Router();

const { login } = AuthController;

router.get("/login", login);

export default router;
