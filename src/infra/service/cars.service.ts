
export interface CarsService {
   findAll(props: CarsService.InputAllCars): Promise<CarsService.OutputAllCars>;
   auth(props: CarsService.InputAuth): Promise<CarsService.OutputAuth>;
   create(props: CarsService.InputCreateCar): Promise<CarsService.OutputCreateCar>
}

export namespace CarsService {
   export interface InputCreateCar {
      name: string,
      brand: string,
      yearFabrication: number,
      price: number
      accessToken: string
   }
   export interface InputAllCars {
      page: number,
      pageSize: number,
      active: boolean
      accessToken: string
   }

   export interface InputAuth {
      login: string,
      password: string
   }

   export interface OutputCreateCar {
      id: string
   }

   export interface OutputAuth {
      accessToken: string,
      refreshToken: string,
      tokenType: string,
      expiresIn: number,
   }

   export interface OutputAllCars { 
      paginacao: {
         pagina: number,
         tamanhoPagina: number,
         total: number,
      },
      items: {
         id: string,
         nome: string,
         marca: string,
         preco: number,
         anoFabricacao: number
         ativo: boolean
         criadoEm: Date
         atualizadnoEm: Date | null
      }[]
   }
}