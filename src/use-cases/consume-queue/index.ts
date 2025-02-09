import { env } from "../../config/env"
import { MongooseRepository } from "../../infra/repositories/mongoose.repository"
import { ApiCarCoreService } from "../../infra/service/implementantion/api-car-core.service"
import { RabbitMQService } from "../../infra/service/implementantion/rabbitmq.service"
import { ConsumeQueueUseCase } from "./consume-queue-use-case"

const rabbitmqService = new RabbitMQService(env.RABBITMQ_URL)

const mongooseRepository = new MongooseRepository()

const apiCarCoreService = new ApiCarCoreService()

const consumeQueueUseCase = new ConsumeQueueUseCase(
   rabbitmqService, 
   mongooseRepository,
   apiCarCoreService
)

export { consumeQueueUseCase }