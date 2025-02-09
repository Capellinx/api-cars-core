

export interface CarsRepository {
   createLog(message: string): Promise<void>
}