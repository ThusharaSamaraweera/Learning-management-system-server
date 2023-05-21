import { Router } from "express";
import courseValidator from "../requestValidators/courseValidator";
import courseController from "../controllers/courseController";

const routes: Router = Router();
routes.post("/courses", courseValidator.validateCreateCourse, courseController.createCourse);

export default routes;