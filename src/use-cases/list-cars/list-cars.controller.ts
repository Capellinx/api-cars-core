import { Request, Response } from "express";
import { ListCarsUseCase } from "./list-cars";

export class ListCarsController {
   constructor(
      private listCarsUseCase: ListCarsUseCase
   ){}

   async handle(request: Request, response: Response): Promise<Response> {
      const { pagina: page, tamanhoPagina: pageSize, ativo: active } = request.query;

      const cars = await this.listCarsUseCase.execute({
         page: Number(page),
         pageSize: Number(pageSize),
         active: active === "true" ? true : false
      })

      return response.status(200).json(cars)
   }
}