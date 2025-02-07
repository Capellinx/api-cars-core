import { BhutService } from "../../infra/service/bhut.service";
import { AuthenticateUserUseCase } from "./authenticate-user";

const btuthService = new BhutService()

const authenticateUserUseCase = new AuthenticateUserUseCase(btuthService)

export { authenticateUserUseCase }