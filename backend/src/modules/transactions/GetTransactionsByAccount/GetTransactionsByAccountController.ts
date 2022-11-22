import { Request, Response } from "express";
import { GetTransactionsByAccountUseCase } from "./GetTransactionsByAccountUseCase";

export class GetTransactionsByAccountController {
  async handle(request: Request, response: Response) {
    const { id, filter = '' } = request.query;
    if(id){
      const getTransactionsByAccountUseCase = new GetTransactionsByAccountUseCase();
      const result = await getTransactionsByAccountUseCase.execute({ id: id.toString(), filter: filter?.toString() });
      return response.json({ transactions: result });
    }
    

    
  }
}
