import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors";

export class VerifyJwtMiddleware {
   static execute(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization;

      if (!token) {
         throw new UnauthorizedError("Token is required");
      }

      next();
   }
}
