import express from "express";

import { register, login } from "../controllers/UserController";

import { verifyToken } from "./verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export { router as UserRoutes };
