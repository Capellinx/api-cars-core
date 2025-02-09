import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

interface IRequestSchemas {
   params?: AnyZodObject;
   body?: AnyZodObject;
   query?: AnyZodObject;
}

export class DtoRequestValidationMiddleware {
   static execute(schemas: IRequestSchemas) {
      return async (request: Request, response: Response, next: NextFunction) => {
         if (schemas.params) {
            request.params = await schemas.params.parseAsync(request.params);
         }

         if (schemas.body) {
            request.body = await schemas.body.parseAsync(request.body);
         }

         if (schemas.query) {
            request.query = await schemas.query.parseAsync(request.query);
         }

         next();
      };
   }
}