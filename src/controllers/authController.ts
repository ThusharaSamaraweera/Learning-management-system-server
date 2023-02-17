import { NextFunction, Request, Response } from "express";
import { AUTH_SERVICE } from "../constants/logConstants";
import { LoginDetails, NewUser } from "../modules";
import authService from "../services/authService";
import { apiResponse } from "../utils/successResponse";
import { Logger } from "../utils/logger/logger";

async function signup(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger(AUTH_SERVICE);
  try {
    const user: NewUser = req.body;
    logger.info({ message: "Calling signup service" });
    await authService.signup(logger, user);
    return res.json(apiResponse._201());
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger(AUTH_SERVICE)

  try {
    const loginDetails: LoginDetails = req.body
    logger.info({message: "Calling login service"})
    const {user, token} = await authService.login(logger, loginDetails)
    return res.json(apiResponse._200({user, token}))
  } catch (error) {
    logger.error(error)
    next(error)
  }
}

export default {
  signup,
  login
};
