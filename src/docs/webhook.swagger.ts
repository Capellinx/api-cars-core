import { NextFunction, Request, Response, Router } from "express";
import { weebhookNotifyController } from "../use-cases/weebhook-notify";
import { VerifyJwtMiddleware } from "../middlewares/verify-jwt.middleware";
import { weebhookRouter } from "../routes/weebhook";

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Endpoints relacionados ao webhook
 */

/**
 * @swagger
 * /api/notify:
 *   post:
 *     summary: Recebe uma notificação via webhook
 *     description: Esse endpoint é responsável por receber uma notificação enviada por um serviço de terceiros e processá-la.
 *     tags: [Webhook]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Carro do modelo X foi criado"
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-09T12:00:00Z"
 *     responses:
 *       200:
 *         description: Notificação recebida e processada com sucesso
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 *     x-codeSamples:
 *       - lang: "JavaScript"
 *         source: |
 *           fetch('/api/notify', {
 *             method: 'POST',
 *             headers: {
 *               'Authorization': 'Bearer YOUR_TOKEN',
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({ message: 'Carro do modelo X foi criado', created_at: '2025-02-09T12:00:00Z' })
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data))
 *           .catch(error => console.error('Error:', error));
 */
weebhookRouter.post(
   "/api/notify",
   VerifyJwtMiddleware.execute,
   async (request: Request, response: Response) => {
      await weebhookNotifyController.handle(request, response);
   }
);
