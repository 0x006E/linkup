import { badRequest } from "@hapi/boom"
import { Request } from "express"
import { AnyZodObject, ZodError, z } from "zod"
import { fromZodError } from "zod-validation-error"

export async function zParse<T extends AnyZodObject>(schema: T, req: Request): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req)
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error)
      req.log.debug("ZodError - ", validationError)
      throw badRequest(validationError.toString())
    }
    req.log.debug("Not ZodError - ", error)
    return badRequest(JSON.stringify(error))
  }
}
