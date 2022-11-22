import { prisma } from "../database/prismaClient";
import {
  AuthenticateUserUseCase,
  IAuthenticateUser,
} from "../modules/users/AuthenticateUser/AuthenticateUserUseCase";
import { AppError } from "../middlewares/AppError";
import { hash } from "bcrypt";

beforeAll(async () => {
  const account_bruno = await prisma.accounts.create({
    data: { balance: 100 },
  });

  const pass = await hash("Testando1234", 10);

  await prisma.users.create({
    data: {
      username: "bruno",
      password: pass,
      accountId: account_bruno.id,
    },
  });

  const account_lucas = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "lucas",
      password: pass,
      accountId: account_lucas.id,
    },
  });

  const account_erik = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "erik",
      password: pass,
      accountId: account_erik.id,
    },
  });

  const account_renata = await prisma.accounts.create({
    data: { balance: 100 },
  });

  await prisma.users.create({
    data: {
      username: "renata",
      password: pass,
      accountId: account_renata.id,
    },
  });

  console.log("✨ 4 users successfully created!");
});

afterAll(async () => {
  const deleteUsers = prisma.users.deleteMany();
  const deleteAccounts = prisma.accounts.deleteMany();

  await prisma.$transaction([deleteUsers, deleteAccounts]);

  await prisma.$disconnect();
});

it("should authenticate a valid username", async () => {
  const user: IAuthenticateUser = {
    username: "bruno",
    password: "Testando1234",
  };

  const authenticatedUser = await new AuthenticateUserUseCase().execute(user);
  expect(authenticatedUser).toHaveProperty("token");
  expect(authenticatedUser).toHaveProperty("username");
  expect(authenticatedUser).toHaveProperty("accountId");
});

it("should not authenticate wrong username", async () => {
  const user: IAuthenticateUser = {
    username: "brunooo",
    password: "Testando1234",
  };

  await expect(new AuthenticateUserUseCase().execute(user)).rejects.toEqual(
    new AppError("Username or Password invalid!")
  );
});

it("should not authenticate wrong password", async () => {
  const user: IAuthenticateUser = {
    username: "bruno",
    password: "Testando",
  };

  await expect(new AuthenticateUserUseCase().execute(user)).rejects.toEqual(
    new AppError("Username or Password invalid!")
  );
});

it("should not authenticate blank password", async () => {
  const user: IAuthenticateUser = {
    username: "bruno",
    password: "",
  };

  await expect(new AuthenticateUserUseCase().execute(user)).rejects.toEqual(
    new AppError("Username or Password invalid!")
  );
});

it("should not authenticate blank username", async () => {
  const user: IAuthenticateUser = {
    username: "",
    password: "Testando1234",
  };

  await expect(new AuthenticateUserUseCase().execute(user)).rejects.toEqual(
    new AppError("Username or Password invalid!")
  );
});
