import { Router } from "express";
import userController from "../controllers/userController";
import userValidator from "../validators/userValidator";

const routes: Router = Router();

routes.post(
  "/signup",
  userValidator.validateCreateUser,
  userController.createUser
);

export default routes;
