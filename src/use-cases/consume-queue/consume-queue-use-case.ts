import { CarsRepository } from "../../domain/repositories/cars.repository";
import { LogService } from "../../infra/service/log.service";
import { MessagingService } from "../../infra/service/messaging.service";

export class ConsumeQueueUseCase {
   private readonly queueName = "car-events"

   constructor(
      private messagingService: MessagingService,
      private carsRepository: CarsRepository,
      private logService: LogService
   ) { }

   async execute(): Promise<void> {
      await this.messagingService.start()

      const { messageCount } = await this.messagingService.checkQueue({ queueName: this.queueName })

      if (messageCount <= 0) {
         return console.warn("[WARN] - Queue is empty")
      }

      await this.messagingService.consumeQueue({
         queueName: this.queueName,
         callback: async (message: any) => {
            const car = JSON.parse(message.content.toString())

            await this.logService.registerLog({
               car_id: car.car_id,
               created_at: car.created_at,
               process_at: new Date()
            })

            console.log("[INFO] - Car created successfully");
            return
         }
      })

      return
   }
}