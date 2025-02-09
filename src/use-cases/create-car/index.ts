import { env } from "../../config/env"
import { BhutService } from "../../infra/service/implementantion/bhut.service"
import { RabbitMQService } from "../../infra/service/implementantion/rabbitmq.service"
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user-use-case"
import { PublishCreateInformationUseCase } from "../publish-create-inforamtion/publish-create-information-use-case"
import { CreateCarUseCase } from "./create-car-use-case"
import { CreateCarController } from "./create-car.controller"

const bhutService = new BhutService()

const rabbitmqService = new RabbitMQService(env.RABBITMQ_URL)

const authenticateUseCase = new AuthenticateUserUseCase(bhutService)

const publishCreateInformationUseCase = new PublishCreateInformationUseCase(rabbitmqService)

const createcarUseCase = new CreateCarUseCase(
   bhutService,
   authenticateUseCase,
   publishCreateInformationUseCase
)

const createCarController = new CreateCarController(
   createcarUseCase
)

export { createCarController }