import { Request, Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
  async handle(request: Request, response: Response) {
    const getUsersUseCase = new GetUsersUseCase();
    const result = await getUsersUseCase.execute();

    return response.json({ users: result });
  }
}
