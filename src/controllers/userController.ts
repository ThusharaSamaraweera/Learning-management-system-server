import { NextFunction, Request, Response } from "express";
import { USER_SERVICE } from "../constants/serviceNameConstants";
import { NewUser } from "../modules";
import userService from "../services/userService";
import { Logger } from "../utils/logger/logger";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const logger = new Logger(USER_SERVICE)
    const user: NewUser = req.body
    logger.info({message: "Calling create user service"})
    await userService.create(logger, user)
    return res.json({user});
  } catch (error) {
    console.error(error)
  }
}

export default {
  createUser,
};
