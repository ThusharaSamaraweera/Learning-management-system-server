import { NextFunction, Request, Response } from "express";
import { USER_SERVICE } from "../constants/logConstants";
import userService from "../services/userService";
import { Logger } from "../utils/logger/logger";
import { apiResponse } from "../utils/successResponse";

const getAllUsers = async (req: Request,res: Response , next: NextFunction) => {
    const logger = new Logger(USER_SERVICE)

    try {
        logger.info({message: 'Calling GET users'})        
        const users = await userService.getUsers(logger)
        return res.json(apiResponse._200({users}))
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const enrollToCourse = async (req: Request,res: Response , next: NextFunction) => {
    const logger = new Logger(USER_SERVICE)
    const {userId, courseId } = req.params
    try {
        logger.info({message: `Calling PUT enrollToCourse with userId: ${userId} and courseId: ${courseId}`})
        const user = await userService.enrollToCourse(logger, userId, courseId)
        return res.json(apiResponse._201({user}))
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export default {
    getAllUsers,
    enrollToCourse
}