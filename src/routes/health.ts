import { Request, Response, Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (req: Request, res: Response) => {
   res.sendStatus(200).json({
      status: "OK",
   });
});
