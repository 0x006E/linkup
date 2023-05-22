import express from "express";
import { getUserDetails } from "../controllers/user.controller";
import { checkAuthenticated } from "../middlewares/checkAuthentication";
const router = express.Router();

router.get("/", checkAuthenticated, getUserDetails);

export default router;
