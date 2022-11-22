import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { use } from "../middlewares/use";
import { AuthenticateUserController } from "../modules/users/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/users/CreateUser/CreateUserController";
import { GetUsersController } from "../modules/users/GetUsers/GetUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getUsersController = new GetUsersController();

usersRoutes.post("/", use(createUserController.handle));
usersRoutes.post("/authenticate", use(authenticateUserController.handle));
usersRoutes.get("/", use(ensureAuthenticate), getUsersController.handle);

export { usersRoutes };
