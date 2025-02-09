import { Request, Response, Router } from "express";
import { carsRouter } from "../routes/cars";
import { DtoRequestValidationMiddleware } from "../middlewares/data-transfer-object-validation.middleware";
import { createCarSchema } from "../use-cases/create-car/create-car-dto";
import { createCarController } from "../use-cases/create-car";
import { listCarsController } from "../use-cases/list-cars";
import { listLogsController } from "../use-cases/list-logs";


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

/**
 * @swagger
 * /api/log:
 *   get:
 *     summary: Retrieves a list of car logs
 *     description: Fetches a list of car logs with details such as car_id, created_at, and process_at.
 *     tags: 
 *       - Cars
 *     responses:
 *       200:
 *         description: A list of car logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the log
 *                   car_id:
 *                     type: string
 *                     description: The unique identifier for the car
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the log was created
 *                   process_at:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the log was processed
 *             example:
 *               - id: "67a90958701c9aba52f1f07a"
 *                 car_id: "34557f75-9dd2-424b-9e0d-23f1e6252cb8"
 *                 created_at: "2025-02-09T20:00:20.776Z"
 *                 process_at: "2025-02-09T20:00:24.757Z"
 *               - id: "67a90958701c9aba52f1f07c"
 *                 car_id: "cbe20a5d-8003-4e3a-b2ca-78f928d8f322"
 *                 created_at: "2025-02-09T20:00:21.458Z"
 *                 process_at: "2025-02-09T20:00:24.761Z"
 *               - id: "67a90958701c9aba52f1f07e"
 *                 car_id: "ad977096-afda-4027-a92e-f22ea137774e"
 *                 created_at: "2025-02-09T20:00:22.072Z"
 *                 process_at: "2025-02-09T20:00:24.762Z"
 *       500:
 *         description: Internal server error
 */
carsRouter.get(
   "/api/log",
   async (request: Request, response: Response) => {
      await listLogsController.handle(request, response);
      return;
   }
);
