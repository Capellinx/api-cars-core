import { randomUUID as uuid } from 'crypto'
import { BadRequestError } from '../../utils/errors'

interface ICarsProps {
   id?: string
   nome: string
   marca: string
   preco: number
   anoFabricacao: number
}


class Car {
   private _id: string
   private _nome: string
   private _marca: string
   private _preco: number
   private _anoFabricacao: number

   constructor(props: ICarsProps) {
      this.verifyPriceIsNegative(props.preco)
      this.verifyYearCarFabrication(props.anoFabricacao)

      this._id = props.id ?? uuid()
      this._nome = props.nome
      this._marca = props.marca
      this._preco = props.preco
      this._anoFabricacao = props.anoFabricacao
   }

   public static create(props?: Partial<ICarsProps>) {
      return new Car({
         id: props?.id ?? uuid(),
         nome: props?.nome ?? 'Novo Carro',
         marca: props?.marca ?? 'Genérica',
         preco: props?.preco ?? 0,
         anoFabricacao: props?.anoFabricacao ?? new Date().getFullYear()
      })
   }

   private verifyPriceIsNegative(price: number) {
      if (price < 0) {
         throw new BadRequestError('Price cannot be negative')
      }

      return price
   }

   private verifyYearCarFabrication(year: number) {
      if (year < 0 || year > new Date().getFullYear()) {
         throw new BadRequestError('Year is not valid')
      }
   }

   get id() {
      return this._id
   }

   get nome() {
      return this._nome
   }

   get marca() {
      return this._marca
   }

   get preco() {
      return this._preco
   }

   get anoFabricacao() {
      return this._anoFabricacao
   }
}

export { Car }