import { MongooseRepository } from "../../infra/repositories/mongoose.repository";
import { WebhookNotifyUseCase } from "./webhook-notify-use-case";
import { WeebhookNotifyController } from "./webhook-notify.controller";

const mongooseRepository = new MongooseRepository()

const weebHookNotifyUseCase = new WebhookNotifyUseCase(
   mongooseRepository
)

const weebhookNotifyController = new WeebhookNotifyController(
   weebHookNotifyUseCase
)

export { weebhookNotifyController }