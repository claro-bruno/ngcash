import { Request, Response } from "express";
import { CreateTransactionsUseCase } from "./CreateTransactionsUseCase";

export class CreateTransactionsController {
  async handle(request: Request, response: Response) {
    const { id, username, valor } = request.body;
    const { accountId } = request;
    const createTransactionsUseCase = new CreateTransactionsUseCase();
    const result = await createTransactionsUseCase.execute({
      id,
      username,
      valor,
      accountId,
    });

    return response.json(result);
  }
}
