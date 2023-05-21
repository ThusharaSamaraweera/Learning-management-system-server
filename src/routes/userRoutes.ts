import { Router } from "express";
import userController from "../controllers/userController";
import { authTokenMiddleware } from "../middlewares/authTokenMiddleware";

const routes: Router = Router();

routes.get("/", authTokenMiddleware,userController.getAllUsers);

export default routes;
