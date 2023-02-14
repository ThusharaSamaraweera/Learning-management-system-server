import { Router } from "express";
import userController from "../controllers/authController";
import userValidator from "../requestValidators/userValidator";

const routes: Router = Router();

routes.post("/signup", userValidator.validateSignup, userController.signup);
routes.post("login");

export default routes;
