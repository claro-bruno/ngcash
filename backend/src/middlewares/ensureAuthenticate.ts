import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import { verify } from "jsonwebtoken";
import { getFileContent } from "./getFileContent";

const secret = getFileContent("jwt.evaluation.key");

interface IPayLoad {
  accountId: string;
  username: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {

  
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing");
  }

  try {
    const { accountId, username } = verify(authHeader, secret) as IPayLoad;

    request.username = username.toString();
    request.accountId = accountId.toString();
    return next();
  } catch (err) {
    throw new AppError("Invalid token");
  }
}
