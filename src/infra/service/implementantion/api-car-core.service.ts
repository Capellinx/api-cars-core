import axios from "axios";
import { LogService } from "../log.service";
import { HistoryDTO } from "../../../use-cases/weebhook-notify/webhook-notify-dto";

export class ApiCarCoreService implements LogService {
   async registerLog({ car_id, created_at, process_at }: HistoryDTO): Promise<void> {
       try {
         return await axios.post("http://localhost:3333/api/webhook", {
            car_id,
            created_at,
            process_at
         })
       } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message)
         }
         throw new Error("Failed to register log")
       }
   }
}