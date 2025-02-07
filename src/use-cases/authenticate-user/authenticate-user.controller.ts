import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";


export class AuthenticateUserController {
   constructor(
      private authenticateUseCase: AuthenticateUserUseCase
   ) { }

   async handle(request: Request, response: Response): Promise<Response> {
      const { login, password } = request.body;

      const { accessToken } = await this.authenticateUseCase.execute({
         login,
         password
      })

      return response.status(200).json({ accessToken })
   }
}