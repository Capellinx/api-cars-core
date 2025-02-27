import { env } from "../../config/env";
import { Car } from "../../domain/entities/cars";
import { CarsService } from "../../infra/service/cars.service";
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user-use-case";
import { PublishCreateInformationUseCase } from "../publish-create-inforamtion/publish-create-information-use-case";
import { CreateCarDTO } from "./create-car-dto";

export class CreateCarUseCase {
   constructor(
      private carsService: CarsService,
      private authenticateUseCase: AuthenticateUserUseCase,
      private publishCreateInformationUseCase: PublishCreateInformationUseCase
   ) { }

   async execute({ name, brand, yearFabrication, price }: CreateCarDTO) {
      const { accessToken } = await this.authenticateUseCase.execute({
         login: env.USERNAME,
         password: env.PASSWORD
      })

      const newCar = new Car({
         nome: name,
         marca: brand,
         anoFabricacao: yearFabrication,
         preco: price,
      })

      const { id: car_id } = await this.carsService.create({
         name: newCar.nome,
         brand: newCar.marca,
         yearFabrication: newCar.anoFabricacao,
         price: newCar.preco,
         accessToken
      })

      await this.publishCreateInformationUseCase.execute({ car_id })

      return {
         car_id
      };
   }

}