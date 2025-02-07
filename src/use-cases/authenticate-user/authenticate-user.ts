import { CarsRepository } from "../../domain/repositories/cars.repository";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";

export class AuthenticateUserUseCase {
   constructor(
      private carsRepository: CarsRepository
   ) { }

   async execute({ login, password }: { login: string, password: string }) {
      if (!login || !password) throw new BadRequestError('Login and password are required')

      const authUser = await this.carsRepository.auth({ login, password })

      if (!authUser) throw new UnauthorizedError('Invalid credentials')

         
      return {
         accessToken: authUser.accessToken,
         refreshToken: authUser.refreshToken,
         tokenType: authUser.tokenType,
         expiresIn: authUser.expiresIn
      }
   }
}