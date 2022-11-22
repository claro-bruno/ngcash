import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

export interface IBalanceRequest {
  id: string;
  accountId: string;
}

export class GetAccountBalanceUseCase {
  public async execute({ id, accountId }: IBalanceRequest) {
    if (accountId != id) {
      throw new AppError("Operação não permitida");
    }
    const accountExist = await prisma.accounts.findFirst({
      where: {
        id,
      },
    });

    if (!accountExist) {
      throw new AppError("Operação não permitida");
    }

    return accountExist;
  }
}
