import { USER_STATUS } from "../constants/constants";
import { IUser, jwtPayload, LoginDetails, NewUser } from "../modules";
import { BadRequestError, ServerError, UnauthorizedError } from "../utils/errorHandling/ErrorResponse";
import { logger, Logger } from "../utils/logger/logger";
import CryptoJS from "crypto-js";
import Jwt from 'jsonwebtoken'
import userService from "./userService";
import { AppDataSource } from "../data/database/mysql/connection";
import { UserSchema } from "../data/database/mysql";

async function signup(logger: Logger, user: NewUser) {
  try {
    logger.info({
      message: `Inserting new user: first name-${user.firstName} last name-${user.lastName} email-${user.email}`,
    });

    user.password = hash(user.password);
    const userRepo = AppDataSource.getRepository(UserSchema);

    await userRepo.insert({ ...user, status: USER_STATUS.ACTIVE });
  } catch (error) {
    throw new ServerError("User creation failed", error.message);
  }
}

async function login(logger: Logger, loginDetails: LoginDetails) {
  try {
    const user = await userService.getUserByEmail(logger, loginDetails?.email);
    if(!user) throw new BadRequestError('There is no account for this email', '')

    const enteredPwd = hash(loginDetails.password)
    if(user?.password !== enteredPwd) throw new UnauthorizedError("Login creadintials invalid",'');

    const payload: jwtPayload = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
      status: user?.status,
      userTitle: user?.title,
    };

    const token = Jwt.sign(payload, process.env.ENCRYPTION_SALT!, {expiresIn: 60*60, algorithm: 'HS512'});
    //@ts-ignore
    delete user?.password!
    return {user, token}
  } catch (error) {
    if (error instanceof BadRequestError) throw new BadRequestError(error.name, "");
    if (error instanceof UnauthorizedError) throw new UnauthorizedError(error.name, "");
    throw new ServerError("Login failed", error.message);
  }
}

async function checkEmailExists(email: string) {
  try {
    logger.info({ message: `Validating ${email} already exists or not` });
    const userRepo = AppDataSource.getRepository(UserSchema);
    const existingEamilUserId = await userRepo.findOne({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (existingEamilUserId && existingEamilUserId?.id) throw new BadRequestError(``, `${email} already exists`);
  } catch (error) {
    if (error instanceof BadRequestError) throw new BadRequestError(undefined, error.description);
    throw new ServerError(undefined, error.message);
  }
}

const hash = (item: string) => {
  return CryptoJS.SHA256(item).toString(CryptoJS.enc.Hex);
};


export default {
  signup,
  login,
  checkEmailExists
};
