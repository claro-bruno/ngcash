import { prisma } from "../database/prismaClient";
import { GetUsersUseCase } from "../modules/users/GetUsers/GetUsersUseCase";
// import { AppError } from "../middlewares/AppError";

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

  console.log("✨ 4 users successfully created!");
});

afterAll(async () => {
  const deleteUsers = prisma.users.deleteMany();
  const deleteAccounts = prisma.accounts.deleteMany();

  await prisma.$transaction([deleteUsers, deleteAccounts]);

  await prisma.$disconnect();
});

it("should get all users", async () => {
  const getUsers = await new GetUsersUseCase().execute();

  expect(getUsers).toHaveLength(4);
  expect(getUsers[0]).toHaveProperty("username", "bruno");
  expect(getUsers[1]).toHaveProperty("username", "lucas");
  expect(getUsers[2]).toHaveProperty("username", "renata");
  expect(getUsers[3]).toHaveProperty("username", "erik");
});

it("should return blank array without users", async () => {
  await prisma.users.deleteMany();
  await prisma.accounts.deleteMany();

  const getUsers = await new GetUsersUseCase().execute();

  expect(getUsers).toHaveLength(0);
});
