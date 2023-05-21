import MongoStore from "connect-mongo";
import cors from "cors";
import { cleanEnv, num, str } from "envalid";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import pino from "pino";
import PinoHttp from "pino-http";
import { User } from "./models/user";
import initializePassport from "./passport-config";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";

const pinoLogger = pino();
const httpLogger = PinoHttp({ logger: pinoLogger, useLevel: "info" });
const app = express();
app.use(express.json());
app.use(cors());
app.use(httpLogger);

const env = cleanEnv(process.env, {
  MONGODB_URI: str({
    desc: "MongoDB connection string",
    default: "mongodb://localhost:27017/linkup",
  }),
  PORT: num({ desc: "Port to listen on", default: 3000 }),
});

main().catch((err) => pinoLogger.error(err));

async function main() {
  await mongoose.connect(env.MONGODB_URI);
  pinoLogger.info("Connected to MongoDB");

  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: mongoose.connection.getClient().options.dbName,
        collectionName: "sessions",
        stringify: false,
        autoRemove: "interval",
        autoRemoveInterval: 1,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  initializePassport();

  User.register(
    {
      name: "John Doe",
      email: "john@example.com",
      active: false,
    },
    "help",
    (err) => pinoLogger.error(err)
  );

  app.use("/auth", authRouter);
  app.use("/posts", postRouter);

  app.listen(env.PORT, () => {
    pinoLogger.info("Server started on port " + env.PORT);
  });
}
