import express from "express";
import { router } from "../routes";
import { errorHandler } from "../middlewares/ErrorMessage";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger.json";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

export { app };
