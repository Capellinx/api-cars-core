import { BhutService } from "../../infra/service/bhut.service";
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user";
import { ListCarsUseCase } from "./list-cars-use-case";
import { ListCarsController } from "./list-cars.controller";

const bhutService = new BhutService()

const authenticateUserUseCase = new AuthenticateUserUseCase(
   bhutService
)

const listCarsUseCse = new ListCarsUseCase(
   bhutService,
   authenticateUserUseCase
)

const listCarsController = new ListCarsController(
   listCarsUseCse
)

export { listCarsController }