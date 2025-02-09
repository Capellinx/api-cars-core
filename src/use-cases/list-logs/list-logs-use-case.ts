import { CarsRepository } from "../../domain/repositories/cars.repository";

export class ListLogsUseCase { 
   constructor(
      private carsRepository: CarsRepository
   ){}

   async execute() {
      return this.carsRepository.findAll()
   }
}