import { model, Schema } from "mongoose";
import { CarsRepository } from "../../domain/repositories/cars.repository";
import { date, z } from "zod";
import { historyLogSchema } from "../../use-cases/weebhook-notify/webhook-notify-dto";


export class MongooseRepository implements CarsRepository {
   async createLog({car_id, created_at, process_at}: CarsRepository.Input): Promise<void> {
      const schema = new Schema<z.infer<typeof historyLogSchema>>({
         car_id: String,
         created_at: {
            type: Date,
         },
         process_at: {
            type: Date,
         }
      })

      const HistoryLog = model('HistoryLog', schema, 'history_logs')

      const newHistoryLog = new HistoryLog({ 
         car_id,
         created_at,
         process_at
       });

      await newHistoryLog.save()

      return
   }

}