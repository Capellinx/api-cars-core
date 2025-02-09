import { beforeAll, describe, expect, it, vi } from "vitest";
import { RabbitMQService } from "../../../infra/service/implementantion/rabbitmq.service";
import { ConsumeQueueUseCase } from "../consume-queue-use-case";
import { MongooseRepository } from "../../../infra/repositories/mongoose.repository";
import { ApiCarCoreService } from "../../../infra/service/implementantion/api-car-core.service";
import exp from "constants";
import { env } from "../../../config/env";

describe("Consume queue use case", () => {
   let rabbitmqService: RabbitMQService
   let mongooseRepository: MongooseRepository
   let apiCarCoreService: ApiCarCoreService

   beforeAll(async () => {

      rabbitmqService = new RabbitMQService(env.RABBITMQ_URL)
      await rabbitmqService.start()

      mongooseRepository = new MongooseRepository()
      apiCarCoreService = new ApiCarCoreService()
   })
   it("Soud be able to dont have information on queue", async () => {
      const consumeQueueUseCase = new ConsumeQueueUseCase(
         rabbitmqService,
         mongooseRepository,
         apiCarCoreService
      )

      const consoleWarnSpy = vi.spyOn(console, "warn")
      await consumeQueueUseCase.execute()

      expect(consoleWarnSpy).toHaveBeenCalled()
   })
})