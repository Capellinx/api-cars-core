import { Request, Response, Router } from "express";
import { listCarsController } from "../use-cases/list-cars";
import { DtoRequestValidationMiddleware } from "../middlewares/data-transfer-object-validation.middleware";
import { listCarsSchema } from "../use-cases/list-cars/list-cars-dto";

export const carsRouter = Router()

carsRouter.get(
   "/api/car",
   DtoRequestValidationMiddleware.execute({ body: listCarsSchema }),
   async (request: Request, response: Response) => {
      await listCarsController.handle(request, response)
      return
   }
)
