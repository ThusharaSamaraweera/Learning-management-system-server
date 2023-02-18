import { Router } from "express";
import authRouter from '../routes/authRoutes'
import userRouter from '../routes/userRoutes'

const routes = Router()

routes.use("/auth", authRouter);
routes.use("/users", userRouter);

export default routes