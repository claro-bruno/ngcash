import { prisma } from "../../../database/prismaClient";

export class GetUsersUseCase {
  async execute() {
    return await prisma.users.findMany({
      select: {
        username: true,
        accountId: true,
      },
    });
  }
}
