import { HistoryLog } from './webhook-notify-schema';

export class WebhookNotifyUseCase {
   constructor() { }

   async execute({ message }: { message: string }) {
      const newHistoryLog = new HistoryLog({ message });
      const savedLog = await newHistoryLog.save();

      return savedLog;
   }
}
