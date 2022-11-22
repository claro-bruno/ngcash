import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";

export interface IGetTransactions {
  id: string;
  filter?: string;
}

export class GetTransactionsByAccountUseCase {
  async execute({ id, filter }: IGetTransactions) {
    let transactions: any = [];
    const accountExist = await prisma.accounts.findFirst({
      where: {
        id,
      },
    });

    if (!accountExist) {
      throw new AppError("Conta Inexistente");
    }
    if (!filter) {
      transactions = await prisma.transactions.findMany({
        where: {
          OR: [
            {
              debitedAccountId: id,
            },
            {
              creditedAccountId: id,
            },
          ],
        },
        select: {
          id: true,
          value: true,
          creditedAccountId: true,
          debitedAccountId: true,
          created_at: true,
          accounts_credited: {
            select: {
              users: {
                select: {
                  username: true,
                }
              }
            }
          },
          accounts_debited: {
            select: {
              users: {
                select: {
                  username: true,
                }
              }
            }
          }
        }
      });
    }
    if (filter == "cash-in") {
      transactions = await prisma.transactions.findMany({
        where: {
          creditedAccountId: id,
        },
        select: {
          id: true,
          value: true,
          creditedAccountId: true,
          debitedAccountId: true,
          created_at: true,
          accounts_credited: {
            select: {
              users: {
                select: {
                  username: true,
                }
              }
            }
          },
          accounts_debited: {
            select: {
              users: {
                select: {
                  username: true,
                }
              }
            }
          }
        }
      });
    }

    if (filter == "cash-out") {
      transactions = await prisma.transactions.findMany({
        where: {
          debitedAccountId: id,
        },
        select: {
          id: true,
          value: true,
          creditedAccountId: true,
          debitedAccountId: true,
          created_at: true,
          accounts_credited: {
            select: {
              users: {
                select: {
                  username: true,
                }
              }
            }
          },
          accounts_debited: {
            select: {
              users: {
                select: {
                  username: true,
                }
              }
            }
          }
        }
      });
      
    }

    if(transactions.length > 0) {
      transactions.forEach((element: any) => {
        if(element.creditedAccountId == id) {
          element.type = 'cash-in';
          element.account = element.accounts_debited.users[0].username;
        } else if(element.debitedAccountId == id) {
          element.type = 'cash-out';
          element.account = element.accounts_credited.users[0].username;
        }
      });
      return transactions;
    } else {
      return [];
    }
  }
}
