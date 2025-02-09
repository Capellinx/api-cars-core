import { beforeAll, describe, expect, it, vi } from "vitest";
import { ListLogsUseCase } from "../list-logs-use-case";  // Ajuste o caminho conforme necessário
import { CarsRepository } from "../../../domain/repositories/cars.repository";

describe("ListLogsUseCase", () => {
   let carsRepository: CarsRepository;
   let listLogsUseCase: ListLogsUseCase;

   beforeAll(() => {
      carsRepository = {
         findAll: vi.fn().mockResolvedValue([
            {
               id: "1234",
               car_id: "1234",
               created_at: new Date("2025-02-09T21:23:36.676Z"),
               process_at: new Date("2025-02-09T21:23:36.676Z"),
            },
            {
               id: "5678",
               car_id: "5678",
               created_at: new Date("2025-02-09T21:23:36.677Z"),
               process_at: new Date("2025-02-09T21:23:36.677Z"),
            }
         ])
      } as unknown as CarsRepository

      listLogsUseCase = new ListLogsUseCase(carsRepository);
   });

   it("should call findAll and return the mapped list of logs", async () => {
      const result = await listLogsUseCase.execute();

      expect(carsRepository.findAll).toHaveBeenCalled();

      expect(result).toEqual([
         {
            id: "1234",  
            car_id: "1234",
            created_at: new Date("2025-02-09T21:23:36.676Z"),
            process_at: new Date("2025-02-09T21:23:36.676Z"),
         },
         {
            id: "5678", 
            car_id: "5678",
            created_at: new Date("2025-02-09T21:23:36.677Z"),
            process_at: new Date("2025-02-09T21:23:36.677Z"),
         }
      ]);
   });
});
