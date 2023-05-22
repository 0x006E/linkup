import MongoStore from "connect-mongo";
import cors from "cors";
import { cleanEnv, num, str } from "envalid";
import express from "express";
import "express-async-errors";
import session from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import pino from "pino";
import pinoHttp from "pino-http";
import errorHandler from "./middlewares/errorHandler";
import initializePassport from "./passport-config";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
const pinoLogger = pino({ level: "trace" });
const pinoHttpLogger = pinoHttp({ logger: pinoLogger });

const app = express();
app.use(pinoHttpLogger);
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

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
  app.use("/auth", authRouter);
  app.use("/posts", postRouter);
  app.use("/user", userRouter);
  app.use(errorHandler);

  app.listen(env.PORT, () => {
    pinoLogger.info("Server started on port " + env.PORT);
  });
}
