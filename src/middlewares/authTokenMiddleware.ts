import { NextFunction, Request, Response } from "express";
import { AUTH_SERVICE } from "../constants/logConstants";
import { UnauthorizedError } from "../utils/errorHandling/ErrorResponse";
import { Logger, logger } from "../utils/logger/logger";
import Jwt from "jsonwebtoken";
import userService from "../services/userService";
import { jwtPayload } from "../modules";
import authService from "../services/authService";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // const whiteListedPaths = ["login", "signup"];
  const authorizationToken = req.headers.authorization?.split(" ")[1];

  try {
    // if (whiteListedPaths.some((path) => req.originalUrl.includes(path))) {
    //   next();
    // }

    if (authorizationToken) {
      const payload = authService.getPayloadByToken(new Logger(AUTH_SERVICE), authorizationToken);
      const user = await userService.getUserByEmail(new Logger(AUTH_SERVICE), payload?.email, payload?.id);
      req.body.user = user;
      next();
    } else {
      logger.error({ serviceName: AUTH_SERVICE, message: "Authorization token missing from headers" });
      throw new UnauthorizedError("Authorization token missing from headers", "");
    }
  } catch (error) {
    const errorNames = ["JsonWebTokenError", "NotBeforeError", "TokenExpiredError"];
    if (error.name && errorNames.includes(error.name))
      return next(new UnauthorizedError("Invalid or expired token.", ""));
    logger.error({ serviceName: AUTH_SERVICE, message: error });
    next(error);
  }
};
