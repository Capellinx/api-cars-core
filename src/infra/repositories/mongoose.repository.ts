import { model, Schema } from "mongoose";
import { CarsRepository } from "../../domain/repositories/cars.repository";
import { z } from "zod";
import { historyLogSchema } from "../../use-cases/weebhook-notify/webhook-notify-schema";


export class MongooseRepository implements CarsRepository {
   async createLog(message: string): Promise<void> {
      const schema = new Schema<z.infer<typeof historyLogSchema>>({
         message: String,
         createdAt: {
            type: Date,
            default: Date.now
         },
      })

      const HistoryLog = model('HistoryLog', schema, 'history_logs')

      const newHistoryLog = new HistoryLog({ message });

      await newHistoryLog.save()

      return
   }

}