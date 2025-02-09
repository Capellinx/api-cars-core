import { Request, Response } from "express";
import { WebhookNotifyUseCase } from "./webhook-notify-use-case";

export class WeebhookNotifyController {
   constructor(
      private weebhookNotifyUseCase: WebhookNotifyUseCase
   ){}

   async handle(request: Request, response: Response) {
      const { message } = request.body;

      await this.weebhookNotifyUseCase.execute({ message })

      return response.status(200).send()
   }
}