import { BhutService } from "../../infra/service/bhut.service";
import { AuthenticateUserController } from "./authenticate-user.controller";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

const btuthService = new BhutService()

const authenticateUserUseCase = new AuthenticateUserUseCase(btuthService)

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

export { authenticateUserController }