export interface CarsRepository {
   createLog({car_id, created_at, process_at}: CarsRepository.Input): Promise<void>
   findAll(): Promise<CarsRepository.Output[]>
}

export namespace CarsRepository { 
   export type Input = {
      car_id: string,
      created_at: Date,
      process_at: Date,
   }

   export type Output = {
      id: string,
      car_id: string,
      created_at: Date,
      process_at: Date,
   }
}