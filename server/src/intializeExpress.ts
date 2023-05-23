import MongoStore from "connect-mongo"
import cors from "cors"
import express, { Express } from "express"
import session from "express-session"
import mongoose from "mongoose"
import passport from "passport"
import redoc from "redoc-express"
import { pinoHttpLogger } from "./helpers/pinoLogger"
import errorHandler from "./middlewares/errorHandler"
import { User } from "./models/user"
import indexRouter from "./routes"

function setupRedoc(app: Express) {
  app.get("/docs/swagger.json", (req, res) => {
    res.sendFile("swagger.json", { root: "." })
  })
  app.get(
    "/docs",
    redoc({
      title: "API Docs",
      specUrl: "/docs/swagger.json"
    })
  )
}
export default function initializeExpress(app: Express) {
  app.use(pinoHttpLogger)
  app.use(express.json())
  app.use(cors())
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
        autoRemoveInterval: 1
      })
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(User.createStrategy())
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
  app.use("/", indexRouter)
  setupRedoc(app)
  app.use(errorHandler)
}
