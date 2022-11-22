import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { use } from "../middlewares/use";
import { GetAccountBalanceController } from "../modules/accounts/GetAccountBalance/GetAccountBalanceController";

const accountsRoutes = Router();

const getAccountBalanceController = new GetAccountBalanceController();

accountsRoutes.get(
  "/:id",
  use(ensureAuthenticate),
  use(getAccountBalanceController.handle)
);
export { accountsRoutes };
