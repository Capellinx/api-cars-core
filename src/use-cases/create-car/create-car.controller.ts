import { Request, Response } from "express";
import { CreateCarUseCase } from "./create-car-use-case";


export class CreateCarController {
   constructor(
      private createCarUseCase: CreateCarUseCase
   ) { }

   async handle(request: Request, response: Response): Promise<Response> {
      const { name, brand, yearFabrication, price } = request.body;

      const { car_id } = await this.createCarUseCase.execute({
         name,
         brand,
         yearFabrication,
         price
      })

      return response.status(201).json({ car_id })
   }
}