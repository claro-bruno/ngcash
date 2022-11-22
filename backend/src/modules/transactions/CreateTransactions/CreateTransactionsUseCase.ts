import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

export interface ICreateTransaction {
  id: string;
  username: string;
  valor: number;
  accountId: string;
}

export class CreateTransactionsUseCase {
  async execute({ id, accountId, username, valor }: ICreateTransaction) {
    console.log(valor);
    if (id != accountId || +valor <= 0) {
      throw new AppError("Operação não permitida");
    }

    const accountExist = await prisma.users.findFirst({
      where: {
        accountId: id,
      },
      select: {
        username: true,
        account: {
          select: {
            balance: true,
          },
        },
      },
    });

    if (!accountExist) {
      throw new AppError("Operação não permitida");
    }

    if (+valor > +accountExist.account.balance) {
      throw new AppError("Operação não permitida");
    }

    const accountDestinoExist = await prisma.users.findFirst({
      where: {
        username,
      },
      select: {
        username: true,
        accountId: true,
        account: {
          select: {
            balance: true,
          },
        },
      },
    });

    if (!accountDestinoExist || accountDestinoExist.accountId == accountId) {
      throw new AppError("Operação não permitida");
    }

    if (accountDestinoExist) {
      await prisma.transactions.create({
        data: {
          creditedAccountId: accountDestinoExist?.accountId,
          debitedAccountId: id,
          value: +valor,
        },
      });

      await prisma.accounts.update({
        where: {
          id: accountDestinoExist?.accountId,
        },
        data: {
          balance: +accountDestinoExist.account.balance + +valor,
        },
      });

      await prisma.accounts.update({
        where: {
          id,
        },
        data: {
          balance: +accountExist.account.balance - +valor,
        },
      });
    }

    return "Transferência feita com sucesso";
  }
}
