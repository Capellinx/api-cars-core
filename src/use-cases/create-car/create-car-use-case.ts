import { env } from "../../config/env";
import { Car } from "../../domain/entities/cars";
import { CarsService } from "../../domain/service/cars.service";
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user";
import { CreateCarDTO } from "./create-car-dto";

export class CreateCarUseCase {
   constructor(
      private carsService: CarsService,
      private authenticateUseCase: AuthenticateUserUseCase
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

      const { id: carId } = await this.carsService.create({
         name: newCar.nome,
         brand: newCar.marca,
         yearFabrication: newCar.anoFabricacao,
         price: newCar.preco,
         accessToken
      })

      return {
         carId
      };
   }

}