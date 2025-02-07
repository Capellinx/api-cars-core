import { API } from "../../config/api";
import { CarsService } from "../../domain/service/cars.service";

export class BhutService implements CarsService {
   async auth({ login, password }: CarsService.InputAuth): Promise<CarsService.OutputAuth> {
      try {
         const { data } = await API.post("/autenticacao/token", {
            login,
            password
         })

         return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tokenType: data.tokenType,
            expiresIn: data.expiresIn
         }
      } catch (error) {
         throw error
      }
   }

   async findAll({ page, pageSize, active, accessToken }: CarsService.InputAllCars): Promise<CarsService.OutputAllCars> {
      try {
         const { data } = await API.post("/carro", {
            params: {
               page,
               pageSize,
               active
            },
            Headers: {
               Authorization: `Bearer ${accessToken}`
            }
         })



         return {
           paginacao: data.paginacao,
           items: data.items,
         }
      } catch (error) {
         throw error
      }
   }
}