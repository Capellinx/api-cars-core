import { Request, Response, Router } from "express";
import { healthRouter } from "../routes/health";

/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: API para monitoramento da saúde do sistema
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Retorna o status da API
 *     description: Endpoint usado para verificar se a API está funcionando corretamente.
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: A API está funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       500:
 *         description: Erro interno do servidor
 */
healthRouter.get("/health", (req: Request, res: Response) => {
   res.status(200).send("OK");
});
