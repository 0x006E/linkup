import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";
import { checkLoggedIn } from "../middlewares/checkAuthentication";
const router = express.Router();

router.post("/login", checkLoggedIn, loginController);

router.post("/logout", logoutController);

router.post("/register", checkLoggedIn, registerController);

router.post("/forgot-password", function (req, res) {});

export default router;
