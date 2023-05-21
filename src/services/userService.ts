import { UserSchema } from "../data/database/mysql";
import { AppDataSource } from "../data/database/mysql/connection";
import { IUser } from "../modules";
import { ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger/logger";

const getUserByEmail = async (logger: Logger, email: string, id?: string) => {
  logger.info({ message: `Getting user by ${email}` });
  try {
    const userRepo = AppDataSource.getRepository(UserSchema);
    const user = await userRepo.findOne({
      where: {
        email: email,
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNumber: true,
        status: true,
        password: true,
        role: true,
        title: true,
      },
    });

    return user as unknown as IUser;
  } catch (error) {
    logger.error({message: error.message})
    throw new ServerError("Get user by email failed", error.message);
  }
};

const getUsers = async (logger: Logger) => {
  logger.info({ message: `Getting users` });

  try {
    const userRepo = AppDataSource.getRepository(UserSchema);
    const users = await userRepo.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNumber: true,
        status: true,
      },
    });

    return users as unknown as IUser[];
  } catch (error) {
    logger.error({ message: error.message });
    throw new ServerError("Get users failed", error.message);
  }
};

export default {
  getUserByEmail,
  getUsers,
};
