import { Router } from "express";
import userController from "../controllers/userController";

const routes: Router = Router();

routes.get("/", userController.getAllUsers);

export default routes;
