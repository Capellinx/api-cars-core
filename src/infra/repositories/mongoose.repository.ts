import { model, Schema, Document } from "mongoose";
import { CarsRepository } from "../../domain/repositories/cars.repository";

interface HistoryLog extends Document {
   car_id: string;
   created_at: Date;
   process_at: Date;
}

const createSchema = new Schema<HistoryLog>({
   car_id: String,
   created_at: {
      type: Date,
   },
   process_at: {
      type: Date,
   }
});

const HistoryLogModel = model<HistoryLog>('HistoryLog', createSchema, 'history_logs');

export class MongooseRepository implements CarsRepository {
   constructor() { }

   async createLog({ car_id, created_at, process_at }: CarsRepository.Input): Promise<void> {
      const newHistoryLog = new HistoryLogModel({
         car_id,
         created_at,
         process_at
      });

      await newHistoryLog.save();
   }

   async findAll(): Promise<CarsRepository.Output[]> {
      const allLogs = await HistoryLogModel.find().lean();

      return allLogs.map(log => ({
         id: log._id.toString(),
         car_id: log.car_id,
         created_at: log.created_at,
         process_at: log.process_at,
      }));
   }
}
