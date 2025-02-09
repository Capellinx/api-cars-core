import { Request, Response, Router } from "express";
import { carsRouter } from "../routes/cars";
import { authenticateUserController } from "../use-cases/authenticate-user";
import { DtoRequestValidationMiddleware } from "../middlewares/data-transfer-object-validation.middleware";
import { authenticateUserSchema } from "../use-cases/authenticate-user/authenticate-user-dto";
import { createCarSchema } from "../use-cases/create-car/create-car-dto";
import { createCarController } from "../use-cases/create-car";
import { listCarsController } from "../use-cases/list-cars";

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Endpoints relacionados a carros
 */

/**
 * @swagger
 * /api/token:
 *   post:
 *     summary: Autentica um usuário e retorna um token de acesso
 *     description: Esse endpoint permite autenticar um usuário utilizando o login e senha, retornando um token de acesso (JWT) e outros detalhes.
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "senhaSecreta123"
 *     responses:
 *       200:
 *         description: Token de acesso gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzg5MTA1MDgsInBheWxvYWQiOnsiaWQiOiJjM2EyZWY1Mi00OTcxLTRkM2UtODI4OC0wOTgwNDNjMWQ1MGIiLCJsb2dpbiI6Imx1Y2FzLmNhcGVsbGEiLCJuYW1lIjoiTHVjYXMgQ2FwZWxsYSIsImdyb3VwSWQiOiI5OTFhOTExNC01ZmE4LTRiNjItOTBiZi05Yjk4NjI1MzljNGIiLCJncm91cE5hbWUiOiJVc3XDoXJpbyJ9"
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzg5MzkzMDgsInBheWxvYWQiOnsiaWQiOiJjM2EyZWY1Mi00OTcxLTRkM2UtODI4OC0wOTgwNDNjMWQ1MGIiLCJsb2dpbiI6Imx1Y2FzLmNhcGVsbGEiLCJuYW1lIjoiTHVjYXMgQ2FwZWxsYSIsImdyb3VwSWQiOiI5OTFhOTExNC01ZmE4LTRiNjItOTBiZi05Yjk4NjI1MzljNGIiLCJncm91cE5hbWUiOiJVc3XDoXJpbyJ9"
 *                 tokenType:
 *                   type: string
 *                   example: "Bearer"
 *                 expiresIn:
 *                   type: integer
 *                   example: 14400
 *       400:
 *         description: Dados de login ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 *     x-codeSamples:
 *       - lang: "JavaScript"
 *         source: |
 *           fetch('/api/token', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({ login: 'usuario@example.com', password: 'senhaSecreta123' })
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data))
 *           .catch(error => console.error('Error:', error));
 */
carsRouter.post(
   "/api/token",
   DtoRequestValidationMiddleware.execute({ body: authenticateUserSchema }),
   async (request: Request, response: Response) => {
      await authenticateUserController.handle(request, response)
      return
   }
)

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Endpoints relacionados a carros
 */

/**
 * @swagger
 * /api/car:
 *   post:
 *     summary: Cria um novo carro
 *     description: Esse endpoint cria um novo carro com os dados fornecidos, como nome, marca, ano de fabricação e preço.
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fusca"
 *               brand:
 *                 type: string
 *                 example: "Volkswagen"
 *               yearFabrication:
 *                 type: integer
 *                 example: 1965
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 15000.50
 *     responses:
 *       201:
 *         description: Carro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car_id:
 *                   type: string
 *                   format: uuid
 *                   example: "d4d8f9a9-d2e4-4b3d-9f70-e8ef3f76f879"
 *       400:
 *         description: Dados inválidos no corpo da requisição
 *       500:
 *         description: Erro interno do servidor
 *     x-codeSamples:
 *       - lang: "JavaScript"
 *         source: |
 *           fetch('/api/car', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               name: 'Fusca',
 *               brand: 'Volkswagen',
 *               yearFabrication: 1965,
 *               price: 15000.50
 *             })
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data))
 *           .catch(error => console.error('Error:', error));
 */
carsRouter.post(
   "/api/car",
   DtoRequestValidationMiddleware.execute({ body: createCarSchema }),
   async (request: Request, response: Response) => {
      const car_id = await createCarController.handle(request, response);
      return 
   }
);


/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Endpoints relacionados a carros
 */

/**
 * @swagger
 * /api/car:
 *   get:
 *     summary: Lista todos os carros
 *     description: Esse endpoint retorna uma lista de todos os carros registrados no sistema.
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista de carros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "d4d8f9a9-d2e4-4b3d-9f70-e8ef3f76f879"
 *                   name:
 *                     type: string
 *                     example: "Fusca"
 *                   brand:
 *                     type: string
 *                     example: "Volkswagen"
 *                   yearFabrication:
 *                     type: integer
 *                     example: 1965
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 15000.50
 *       500:
 *         description: Erro interno do servidor
 *     x-codeSamples:
 *       - lang: "JavaScript"
 *         source: |
 *           fetch('/api/car', {
 *             method: 'GET',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             }
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data))
 *           .catch(error => console.error('Error:', error));
 */
carsRouter.get(
   "/api/car",
   async (request: Request, response: Response) => {
      await listCarsController.handle(request, response);
      return;
   }
);