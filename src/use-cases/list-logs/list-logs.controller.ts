import { Request, Response } from "express";
import { ListLogsUseCase } from "./list-logs-use-case";


export class ListLogsController {
   constructor(
      private listLogsUseCase: ListLogsUseCase
   ){}
   

   async handle(request: Request, response: Response) {
      const logs = await this.listLogsUseCase.execute()

      return response.status(200).json(logs)
   }
}