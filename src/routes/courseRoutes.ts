import { Router } from "express";
import courseValidator from "../requestValidators/courseValidator";
import courseController from "../controllers/courseController";
import { authTokenMiddleware } from "../middlewares/authTokenMiddleware";

const routes: Router = Router();
routes.post("/", authTokenMiddleware, courseValidator.validateCreateCourse, courseController.createCourse);

export default routes;