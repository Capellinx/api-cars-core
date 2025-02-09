import { Request, Response } from "express";
import { WebhookNotifyUseCase } from "./webhook-notify-use-case";

export class WeebhookNotifyController {
   constructor(
      private weebhookNotifyUseCase: WebhookNotifyUseCase
   ) { }

   async handle(request: Request, response: Response) {
      const { car_id, created_at, process_at } = request.body;

      await this.weebhookNotifyUseCase.execute({
         car_id,
         created_at,
         process_at
      })

      return response.status(200).send()
   }
}