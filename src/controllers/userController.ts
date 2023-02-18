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

export default {
    getAllUsers
}