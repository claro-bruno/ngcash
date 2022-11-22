import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../middlewares/AppError";
import { hash } from "bcrypt";

export interface ICreateUser {
  username: string;
  password: string;
}

const hasUpper = (str: string) => /[A-Z]/.test(str);
const hasNumber = (str: string) => /[0-9]/.test(str);

export class CreateUserUseCase {
  async execute({ username, password }: ICreateUser) {
    if (username.length < 3) {
      throw new AppError("Dados Inválidos");
    }

    if (password.length < 8 || !hasUpper(password) || !hasNumber(password)) {
      throw new AppError("Dados Inválidos");
    }

    const userExists = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (userExists) {
      throw new AppError("Usuario existente", 401);
    }

    const account_user = await prisma.accounts.create({
      data: {
        balance: 100,
      },
    });

    const hashPassword = await hash(password, 10);
    const { id } = account_user;
    await prisma.users.create({
      data: {
        username,
        password: hashPassword,
        accountId: id,
      },
    });

    return "Usuário criado com sucesso";
  }
}
