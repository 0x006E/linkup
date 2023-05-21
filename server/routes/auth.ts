import express from "express";
import {
  loginController,
  logoutController,
} from "../controllers/authController";
const router = express.Router();

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/forgot-password", function (req, res) {});

export default router;
