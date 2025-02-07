
export interface CarsRepository {
   findAll(props: CarsRepository.InputAllCars): Promise<CarsRepository.OutputAllCars>;
   auth(props: CarsRepository.InputAuth): Promise<CarsRepository.OutputAuth>;
}

export namespace CarsRepository {
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