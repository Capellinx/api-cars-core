export interface CarsRepository {
   createLog({car_id, created_at, process_at}: CarsRepository.Input): Promise<void>
}

export namespace CarsRepository { 
   export type Input = {
      car_id: string,
      created_at: Date,
      process_at: Date,
   }
}