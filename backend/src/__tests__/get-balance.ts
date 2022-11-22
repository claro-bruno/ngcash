import { prisma } from "../database/prismaClient";
import {
  GetAccountBalanceUseCase,
  IBalanceRequest,
} from "../modules/accounts/GetAccountBalance/GetAccountBalanceUseCase";
import { AppError } from "../middlewares/AppError";

afterAll(async () => {
  const deleteUsers = prisma.users.deleteMany();
  const deleteAccounts = prisma.accounts.deleteMany();

  await prisma.$transaction([deleteUsers, deleteAccounts]);

  await prisma.$disconnect();
});

it("should return balance of a valid user", async () => {
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

  const accound_data: IBalanceRequest = {
    id: account_bruno.id,
    accountId: account_bruno.id,
  };
  const getBalanceAccount = await new GetAccountBalanceUseCase().execute(
    accound_data
  );
  expect(getBalanceAccount).toHaveProperty("id");
  expect(getBalanceAccount).toHaveProperty("balance");
});

it("should not return a balance of a wrong user", async () => {
  const account_bruno = await prisma.accounts.create({
    data: { balance: 100 },
  });

  const accound_data: IBalanceRequest = {
    id: "ACCOUNIDERRADA",
    accountId: account_bruno.id,
  };

  await expect(
    new GetAccountBalanceUseCase().execute(accound_data)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});

it("should not return a balance of a wrong user", async () => {
  const accound_data: IBalanceRequest = {
    id: "ACCOUNIDERRADA",
    accountId: "ACCOUNIDERRADA",
  };

  await expect(
    new GetAccountBalanceUseCase().execute(accound_data)
  ).rejects.toEqual(new AppError("Operação não permitida"));
});
