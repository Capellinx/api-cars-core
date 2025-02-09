import { CarsRepository } from '../../domain/repositories/cars.repository';
export class WebhookNotifyUseCase {
   constructor(
      private carsRepository: CarsRepository
   ) { }

   async execute({ message }: { message: string }) {
      if(!message) {
         throw new Error('Message is required');
      }

      await this.carsRepository.createLog(message);

      return
   }
}
