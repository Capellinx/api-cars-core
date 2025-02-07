import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { ApplicationError } from "../utils/errors";

export class HandleErrorsMiddleware {
   constructor() { }

   static execute(
      err: ApplicationError | Error,
      request: Request,
      response: Response,
      next: NextFunction
   ) {
      if (err instanceof ApplicationError) {
         return response.status(err.statusCode).json({
            error: err.message,
         });
      }

      if (err instanceof PrismaClientKnownRequestError) {
         return response.status(500).json({ error: "Database error" });
      }

      if (err instanceof ZodError) {
         return response.status(400).json({ error: err.issues });
      }

      return response.status(500).json({ error: err.message });
   }
}