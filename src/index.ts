import express from "express";
import cors from "cors";
import { errorHandler } from "./utils/errorHandling/errorHandler";
import routes from "./routes";
import { authTokenMiddleware } from "./middlewares/authTokenMiddleware";
import { InitMysqlDb } from "./data/database/mysql/connection";

const app = express();
app.use(cors());
express.urlencoded({ extended: true });
app.use(express.json());

InitMysqlDb();

app.get("/", (req, res) => res.send("API Running"));
app.use("/dev", routes);

app.use(errorHandler.handleRequest);

export default app;
