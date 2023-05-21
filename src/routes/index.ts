import { Router } from "express";
import authRouter from '../routes/authRoutes'
import userRouter from '../routes/userRoutes'
import courseRouter from '../routes/courseRoutes'

const routes = Router()

routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/courses", courseRouter)

export default routes