import { prisma } from "../database/prismaClient";
import {
  CreateTransactionsUseCase,
  ICreateTransaction,
} from "../modules/transactions/CreateTransactions/CreateTransactionsUseCase";

import { AppError } from "../middlewares/AppError";

beforeAll(async () => {
  const deleteTransactions = prisma.transactions.deleteMany();
  const deleteUsers = prisma.users.deleteMany();
  const deleteAccounts = prisma.accounts.deleteMany();

  await prisma.$transaction([deleteTransactions, deleteUsers, deleteAccounts]);
  console.log("✨ 4 users successfully created!");
});

beforeEach(async () => {
  await prisma.users.deleteMany();
  await prisma.transactions.deleteMany();
  await prisma.accounts.deleteMany();
});

afterAll(async () => {
  const deleteTransactions = prisma.transactions.deleteMany();
  const deleteUsers = prisma.users.deleteMany();
  const deleteAccounts = prisma.accounts.deleteMany();

  await prisma.$transaction([deleteTransactions, deleteUsers, deleteAccounts]);
});

it("should create a new transaction", async () => {
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

  const user_lucas = await prisma.users.create({
    data: {
      username: "lucas",
      password: "Testando1234",
      accountId: account_lucas.id,
    },
  });

  const transaction: ICreateTransaction = {
    id: account_bruno.id,
    username: user_lucas.username,
    valor: 40,
    accountId: account_bruno.id,
  };

  const createdTransaction = await new CreateTransactionsUseCase().execute(
    transaction
  );

  const account__bruno = await prisma.accounts.findFirst({
    where: {
      id: account_bruno.id,
    },
  });

  const account__lucas = await prisma.accounts.findFirst({
    where: {
      id: account_lucas.id,
    },
  });

  expect(createdTransaction).toEqual("Transferência feita com sucesso");
  expect(account__bruno).toHaveProperty(
    "balance",
    account_bruno.balance - transaction.valor
  );
  expect(account__lucas).toHaveProperty(
    "balance",
    account_lucas.balance + transaction.valor
  );
});

it("should not make a transaction with a wrong accountId", async () => {
  const account_bruno = await prisma.accounts.create({
    data: { balance: 100 },
  });

  const transaction: ICreateTransaction = {
    id: account_bruno.id,
    username: "ruan",
    valor: 40,
    accountId: account_bruno.id,
  };

  await expect(
    new CreateTransactionsUseCase().execute(transaction)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});

it("should not make a transaction with value less or 0", async () => {
  const account_bruno = await prisma.accounts.create({
    data: { balance: 100 },
  });

  const transaction: ICreateTransaction = {
    id: account_bruno.id,
    username: "ruan",
    valor: 0,
    accountId: account_bruno.id,
  };

  await expect(
    new CreateTransactionsUseCase().execute(transaction)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});

it("should not make a transaction with wrong source account", async () => {
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

  const transaction: ICreateTransaction = {
    id: "ACCOUNID",
    username: "bruno",
    valor: 30,
    accountId: "ACCOUNID",
  };

  await expect(
    new CreateTransactionsUseCase().execute(transaction)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});

it("should not make a transaction with a balance insuficient", async () => {
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

  const user_lucas = await prisma.users.create({
    data: {
      username: "lucas",
      password: "Testando1234",
      accountId: account_lucas.id,
    },
  });

  const transaction: ICreateTransaction = {
    id: account_bruno.id,
    username: user_lucas.username,
    valor: 200,
    accountId: account_bruno.id,
  };

  await expect(
    new CreateTransactionsUseCase().execute(transaction)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});

it("should not make a transaction with wrong destiny account", async () => {
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

  const transaction: ICreateTransaction = {
    id: account_bruno.id,
    username: "lucas",
    valor: 30,
    accountId: account_bruno.id,
  };

  await expect(
    new CreateTransactionsUseCase().execute(transaction)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});

it("should not make a transaction with the accountId", async () => {
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

  const transaction: ICreateTransaction = {
    id: account_bruno.id,
    username: "bruno",
    valor: 30,
    accountId: account_bruno.id,
  };

  await expect(
    new CreateTransactionsUseCase().execute(transaction)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});
