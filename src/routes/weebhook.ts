import { NextFunction, Request, Response, Router } from "express";
import { weebhookNotifyController } from "../use-cases/weebhook-notify";
import { VerifyJwtMiddleware } from "../middlewares/verify-jwt.middleware";

export const weebhookRouter = Router()

weebhookRouter.post(
   "/api/notify",
   VerifyJwtMiddleware.execute,
   async (request: Request, response: Response) => {
      await weebhookNotifyController.handle(request, response);
   }
);
