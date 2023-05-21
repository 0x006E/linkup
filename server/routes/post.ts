import express from "express";
import commentRouter from "./comment";
import likeRouter from "./like";
const router = express.Router();

router.use("/likes", likeRouter);
router.use("/comments", commentRouter);

router.get("/", function (req, res) {});

router.get("/:postId", function (req, res) {});

router.put("/:postId", function (req, res) {});

router.delete("/:postId", function (req, res) {});

export default router;
