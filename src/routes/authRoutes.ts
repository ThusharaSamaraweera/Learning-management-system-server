import { Router } from "express";
import authController from "../controllers/authController";
import authValidator from "../requestValidators/authValidator";

const routes: Router = Router();

routes.post("/signup", authValidator.validateSignup, authController.signup);
routes.post("/login", authValidator.validateLogin, authController.login);

export default routes;
