import { beforeAll, describe, expect, it, vi } from "vitest";
import { PublishCreateInformationUseCase } from "../publish-create-information-use-case";
import { MessagingService } from "../../../infra/service/messaging.service";

describe("PublishCreateInformationUseCase", () => {
   let messagingService: MessagingService;
   let publishCreateInformationUseCase: PublishCreateInformationUseCase;

   beforeAll(() => {
      messagingService = {
         start: vi.fn().mockResolvedValue(undefined),
         createQueue: vi.fn().mockResolvedValue(undefined),
         publishInQueue: vi.fn().mockResolvedValue(undefined)
      } as unknown as MessagingService;

      publishCreateInformationUseCase = new PublishCreateInformationUseCase(messagingService);
   });

   it("should publish message with car_id to the queue", async () => {
      const car_id = "1234";

      await publishCreateInformationUseCase.execute({ car_id });

      expect(messagingService.start).toHaveBeenCalled();
      expect(messagingService.createQueue).toHaveBeenCalledWith({ queueName: "car-events" });
   });

   it("should throw an error if car_id is not provided", async () => {
      await expect(publishCreateInformationUseCase
         .execute({ car_id: "" }))
         .rejects
         .toThrow("car_id is required");
   });
});
