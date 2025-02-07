import { BhutService } from "../../infra/service/bhut.service"
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user-use-case"
import { CreateCarUseCase } from "./create-car-use-case"
import { CreateCarController } from "./create-car.controller"

const bhutService = new BhutService()

const authenticateUseCase = new AuthenticateUserUseCase(
   bhutService
)

const createcarUseCase = new CreateCarUseCase(
   bhutService,
   authenticateUseCase
)

const createCarController = new CreateCarController(
   createcarUseCase
)

export { createCarController }