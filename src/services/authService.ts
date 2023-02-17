import { AppDataSource, InitMysqlDb } from "../config/database/connection";
import { UserSchema } from "../config/database/index";
import { USER_STATUS } from "../constants/constants";
import { LoginDetails, NewUser } from "../modules";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { logger, Logger } from "../utils/logger/logger";
import CryptoJS from "crypto-js";
import { User } from "../config/database/Entities/User";
import Jwt from 'jsonwebtoken'

async function signup(logger: Logger, user: NewUser) {
  try {
    await InitMysqlDb();
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
    await InitMysqlDb();
    const user = await getUserByEmail(logger, loginDetails?.email)
    if(!user) throw new BadRequestError('There is no account for this email', '')

    const enteredPwd = hash(loginDetails.password)
    if(user?.password !== enteredPwd) throw new BadRequestError("Login creadintials invalid",'');

    const payload = {
      email: user.email,
      role: user.role
    }
    const token = Jwt.sign(payload, process.env.ENCRYPTION_SALT!, {expiresIn: 60*60});
    return {user, token}
  } catch (error) {
    if(error instanceof BadRequestError) throw new BadRequestError(error.name, '')
    throw new ServerError("Login failed", error.message);
  }
}

export async function checkEmailExists(email: string) {
  try {
    await InitMysqlDb();
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

export const hash = (item: string) => {
  return CryptoJS.SHA256(item).toString(CryptoJS.enc.Hex);
};

export const getUserByEmail = async (logger: Logger, email: string) => {
  logger.info({ message: `Getting user by ${email}` });

  try {
    const userRepo = AppDataSource.getRepository(UserSchema);
    const user: User | null = await userRepo.findOne({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNumber: true,
        status: true,
        password: true,
      },
    });
    return user
  } catch (error) {
    throw new ServerError("Get user by email failed", error.message);
  }
};

export default {
  signup,
  login,
};
