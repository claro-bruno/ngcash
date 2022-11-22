import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { use } from "../middlewares/use";
import { CreateTransactionsController } from "../modules/transactions/CreateTransactions/CreateTransactionsController";
import { GetTransactionsByAccountController } from "../modules/transactions/GetTransactionsByAccount/GetTransactionsByAccountController";

const transactionsRoutes = Router();

const getTransactionsByAccountController =
  new GetTransactionsByAccountController();

const createTransactionsController = new CreateTransactionsController();

transactionsRoutes.get(
  "/",
  use(ensureAuthenticate),
  use(getTransactionsByAccountController.handle)
);
transactionsRoutes.post(
  "/",
  use(ensureAuthenticate),
  use(createTransactionsController.handle)
);

export { transactionsRoutes };
