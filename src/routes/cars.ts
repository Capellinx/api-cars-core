import { Request, Response, Router } from "express";
import { listCarsController } from "../use-cases/list-cars";
import { DtoRequestValidationMiddleware } from "../middlewares/data-transfer-object-validation.middleware";
import { listCarsSchema } from "../use-cases/list-cars/list-cars-dto";
import { createCarController } from "../use-cases/create-car";
import { createCarSchema } from "../use-cases/create-car/create-car-dto";
import { authenticateUserSchema } from "../use-cases/authenticate-user/authenticate-user-dto";
import { authenticateUserController } from "../use-cases/authenticate-user";

export const carsRouter = Router()

carsRouter.post(
   "/api/token",
   DtoRequestValidationMiddleware.execute({ body: authenticateUserSchema }),
   async (request: Request, response: Response) => {
      await authenticateUserController.handle(request, response)
      return
   }
)

carsRouter.get(
   "/api/car",
   async (request: Request, response: Response) => {
      await listCarsController.handle(request, response)
      return
   }
)

carsRouter.post(
   "/api/car",
   DtoRequestValidationMiddleware.execute({ body: createCarSchema }),
   async (request: Request, response: Response) => {
      await createCarController.handle(request, response)
      return
   }
)