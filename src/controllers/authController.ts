import { NextFunction, Request, Response } from "express";
import { USER_SERVICE } from "../constants/logConstants";
import { NewUser } from "../modules";
import userService from "../services/authService";
import { apiResponse } from "../utils/successResponse";
import { Logger } from "../utils/logger/logger";

async function signup(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger(USER_SERVICE);
  try {
    const user: NewUser = req.body;
    logger.info({ message: "Calling create user service" });
    await userService.signup(logger, user);
    return res.json(apiResponse._201());
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export default {
  signup,
};
