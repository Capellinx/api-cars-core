import { Request, Response, Router } from "express";
import { weebhookNotifyController } from "../use-cases/weebhook-notify";

export const weebhookRouter = Router()

weebhookRouter.post(
   "/api/notify",
   async (request, response) => {
      await weebhookNotifyController.handle(request, response)
   }
)