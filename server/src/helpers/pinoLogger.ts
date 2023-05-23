import { pino } from "pino"
import { pinoHttp } from "pino-http"

export const pinoLogger = pino({ level: "trace" })
export const pinoHttpLogger = pinoHttp({ logger: pinoLogger })
