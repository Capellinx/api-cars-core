import { HistoryDTO } from "../../use-cases/weebhook-notify/webhook-notify-dto";

export interface LogService {
   registerLog({ car_id, created_at, process_at }: HistoryDTO): Promise<void>
}