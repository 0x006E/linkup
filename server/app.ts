import cors from "cors";
import { cleanEnv, str } from "envalid";
import express from "express";
import mongoose from "mongoose";
import pino from "pino";

const pinoLogger = pino();
const app = express();
app.use(express.json());
app.use(cors());

const env = cleanEnv(process.env, {
  MONGODB_URI: str({
    desc: "MongoDB connection string",
    default: "mongodb://localhost:27017/linkup",
  }),
});

main().catch((err) => pinoLogger.error(err));

async function main() {
  await mongoose.connect(env.MONGODB_URI);

  app.listen(3000, () => {});
}
