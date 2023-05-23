import { Router } from "express";
import userController from "../controllers/userController";
import { authTokenMiddleware } from "../middlewares/authTokenMiddleware";

const routes: Router = Router();

routes.get("/", authTokenMiddleware,userController.getAllUsers);
routes.put("/:userId/courses/:courseId", authTokenMiddleware,userController.enrollToCourse);

export default routes;
