import express from "express";
import {
  forgotPassword,
  resetPassword,
  login,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/register", register);
router.post("/login", login);

export default router;
