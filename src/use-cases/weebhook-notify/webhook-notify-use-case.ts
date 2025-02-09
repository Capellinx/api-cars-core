import { CarsRepository } from '../../domain/repositories/cars.repository';
import { HistoryDTO } from './webhook-notify-dto';
export class WebhookNotifyUseCase {
   constructor(
      private carsRepository: CarsRepository
   ) { }

   async execute({ car_id, created_at, process_at }: HistoryDTO
   ) {   
      await this.carsRepository.createLog({
         car_id,
         created_at,
         process_at
      });

      return
   }
}
