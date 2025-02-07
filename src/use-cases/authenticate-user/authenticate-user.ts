import { CarsService } from "../../domain/service/cars.service";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";

export class AuthenticateUserUseCase {
   constructor(
      private carsServiCarsService: CarsService
   ) { }

   async execute({ login, password }: { login: string, password: string }) {
      if (!login || !password) throw new BadRequestError('Login and password are required')

      const authUser = await this.carsServiCarsService.auth({ login, password })

      if (!authUser) throw new UnauthorizedError('Invalid credentials')

         
      return {
         accessToken: authUser.accessToken,
         refreshToken: authUser.refreshToken,
         tokenType: authUser.tokenType,
         expiresIn: authUser.expiresIn
      }
   }
}