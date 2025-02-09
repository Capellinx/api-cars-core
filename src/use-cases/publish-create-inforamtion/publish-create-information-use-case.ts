import { MessagingService } from "../../infra/service/messaging.service";

export class PublishCreateInformationUseCase {
   constructor(
      private messagingService: MessagingService
   ) { }

   async execute({ car_id }: { car_id: string }) {
      if (!car_id) throw new Error("car_id is required")

      await this.messagingService.start()
      
      await this.messagingService.createQueue({ queueName: "car-events" })

      await this.messagingService.publishInQueue({
         queueName: "car-events",
         message: JSON.stringify({
            car_id,
            created_at: new Date().toISOString()
         }) 
      })

      return
   }
}