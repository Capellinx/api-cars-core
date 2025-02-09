import { WebhookNotifyUseCase } from "./webhook-notify-use-case";
import { WeebhookNotifyController } from "./webhook-notify.controller";

const weebHookNotifyUseCase = new WebhookNotifyUseCase();

const weebhookNotifyController = new WeebhookNotifyController(
   weebHookNotifyUseCase
)

export { weebhookNotifyController }