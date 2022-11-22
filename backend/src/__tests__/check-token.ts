import {
  ensureAuthenticate
} from "../middlewares/ensureAuthenticate";
import { AppError } from "../middlewares/AppError";
import { NextFunction, Request, Response } from "express";


it("should not auhorize without a token", async () => {

  const req = { headers: { authorization: ''} } as Request;
  const res = {} as Response;
  const next = Function as NextFunction;
  const check_authorization = await ensureAuthenticate(req, res, next);
  await expect(check_authorization).rejects.toEqual(
    new AppError("Token missing")
  );
});

it("should not auhorize without a invalid token", async () => {

  const req = { headers: { authorization: 'TOKENINVALIDO'} } as Request;
  const res = {} as Response;
  const next = Function as NextFunction;
  const check_authorization = await ensureAuthenticate(req, res, next);
  expect(check_authorization).rejects.toEqual(
    new AppError("Invalid token")
  );
});

 