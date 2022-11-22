import { Router } from "express";
import { accountsRoutes } from "./accounts.routes";
import { usersRoutes } from "./users.routes";
import { transactionsRoutes } from "./transactions.routes";

const router = Router();

router.get("/", (request, response) => {
  response.json("Testando API");
});

router.use("/account", accountsRoutes);
router.use("/user", usersRoutes);
router.use("/transaction", transactionsRoutes);

export { router };
