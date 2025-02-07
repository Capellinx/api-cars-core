import { env } from "../../config/env";
import { CarsService } from "../../domain/service/cars.service";
import { BadRequestError } from "../../utils/errors";
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user-use-case";
import { ListCarsDTO } from "./list-cars-dto";

export class ListCarsUseCase {
   constructor(
      private carsSeriCarsService: CarsService,
      private authenticateUseCase: AuthenticateUserUseCase
   ) { }

   async execute({ page, pageSize, active }: ListCarsDTO) {
      if (page < 1 || pageSize < 1) throw new BadRequestError("Page and pageSize must be greater than zero.")

      if (typeof active !== "boolean") throw new BadRequestError("Active must be a boolean.")

      const { accessToken } = await this.authenticateUseCase.execute({
         login: env.USERNAME,
         password: env.PASSWORD
      })

      const { items, paginacao } = await this.carsSeriCarsService.findAll({
         page,
         pageSize,
         active,
         accessToken
      })

      return {
         items: items?.map((cars: any) => ({
            id: cars.id,
            nome: cars.nome,
            marca: cars.marca,
            preco: cars.preco,
            anoFabricacao: cars.anoFabricacao,
            ativo: cars.ativo,
            criadoEm: cars.criadoEm,
            atualizadnoEm: cars.atualizadnoEm
         })),
         paginacao,
      }
   }
}
