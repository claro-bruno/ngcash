import { Request, Response } from "express";
import { GetAccountBalanceUseCase } from "./GetAccountBalanceUseCase";

export class GetAccountBalanceController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { accountId } = request;
    const getAccountBalanceUseCase = new GetAccountBalanceUseCase();
    const result = await getAccountBalanceUseCase.execute({ id, accountId });

    return response.json(result);
  }
}
