import { prisma } from "../../../database/prismaClient";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../middlewares/AppError";

import { getFileContent } from "../../../middlewares/getFileContent";

export interface IAuthenticateUser {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IAuthenticateUser) {
    if (username == "" || password == "") {
      throw new AppError("Username or Password invalid!");
    }

    const secret = getFileContent("jwt.evaluation.key");

    const userExists = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (!userExists) {
      throw new AppError("Username or Password invalid!");
    }
    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError("Username or Password invalid!");
    }

    const { accountId } = userExists;
    const token = sign({ accountId, username }, secret, { expiresIn: "24h" });
    return { token: token, accountId: accountId, username: username };
  }
}
