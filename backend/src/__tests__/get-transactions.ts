import { prisma } from "../database/prismaClient";
import {
  GetTransactionsByAccountUseCase,
  IGetTransactions,
} from "../modules/transactions/GetTransactionsByAccount/GetTransactionsByAccountUseCase";
import { AppError } from "../middlewares/AppError";

export interface ICreateTransaction {
  id: string;
  username: string;
  valor: number;
  accountId: string;
}

beforeAll(async () => {
  const account_bruno = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "bruno",
      password: "Testando1234",
      accountId: account_bruno.id,
    },
  });

  const account_lucas = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "lucas",
      password: "Testando1234",
      accountId: account_lucas.id,
    },
  });

  const account_renata = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "renata",
      password: "Testando1234",
      accountId: account_renata.id,
    },
  });

  const account_erik = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "erik",
      password: "Testando1234",
      accountId: account_erik.id,
    },
  });

  await prisma.transactions.create({
    data: {
      creditedAccountId: account_lucas.id,
      debitedAccountId: account_bruno.id,
      value: 40,
    },
  });

  await prisma.transactions.create({
    data: {
      creditedAccountId: account_renata.id,
      debitedAccountId: account_lucas.id,
      value: 40,
    },
  });

  await prisma.transactions.create({
    data: {
      creditedAccountId: account_erik.id,
      debitedAccountId: account_renata.id,
      value: 40,
    },
  });

  await prisma.transactions.create({
    data: {
      creditedAccountId: account_bruno.id,
      debitedAccountId: account_erik.id,
      value: 40,
    },
  });
});

afterAll(async () => {
  const deleteTransactions = prisma.transactions.deleteMany();
  const deleteUsers = prisma.users.deleteMany();
  const deleteAccounts = prisma.accounts.deleteMany();

  await prisma.$transaction([deleteTransactions, deleteUsers, deleteAccounts]);
});

it("should get all transactions", async () => {
  const user_bruno = await prisma.users.findFirst({
    where: {
      username: "bruno",
    },
  });
  if (user_bruno) {
    const transactions: IGetTransactions = {
      id: user_bruno.accountId,
      filter: "",
    };
    const getTransactions = await new GetTransactionsByAccountUseCase().execute(
      transactions
    );

    expect(getTransactions).toHaveLength(2);
  }
});

it("should get all cash-in transactions", async () => {
  const user_bruno = await prisma.users.findFirst({
    where: {
      username: "bruno",
    },
  });
  if (user_bruno) {
    const transactions: IGetTransactions = {
      id: user_bruno.accountId,
      filter: "cash-in",
    };
    const getTransactions = await new GetTransactionsByAccountUseCase().execute(
      transactions
    );

    expect(getTransactions).toHaveLength(1);
  }
});

it("should not get all transactions with a wrong accountId", async () => {
  const transactions: IGetTransactions = {
    id: "WRONG ACCOUNT ID",
    filter: "",
  };

  await expect(
    new GetTransactionsByAccountUseCase().execute(transactions)
  ).rejects.toEqual(new AppError("Conta Inexistente"));
});
