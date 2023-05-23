import { cleanEnv, num, str } from "envalid"
import express from "express"
import "express-async-errors"
import mongoose from "mongoose"
import { pinoLogger } from "./helpers/pinoLogger"
import initializeExpress from "./intializeExpress"

const app = express()

const env = cleanEnv(process.env, {
  MONGODB_URI: str({
    desc: "MongoDB connection string",
    default: "mongodb://localhost:27017/linkup"
  }),
  PORT: num({ desc: "Port to listen on", default: 3000 })
})

main().catch((err) => pinoLogger.error(err))

async function main() {
  await mongoose.connect(env.MONGODB_URI)
  pinoLogger.info("Connected to MongoDB")
  initializeExpress(app)

  app.listen(env.PORT, () => {
    pinoLogger.info("Server started on port " + env.PORT)
  })
}
