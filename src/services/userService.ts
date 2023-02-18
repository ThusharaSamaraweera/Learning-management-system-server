import { UserSchema } from "../config/database";
import { AppDataSource } from "../config/database/connection";
import { IUser } from "../modules";
import { ServerError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger/logger";

const getUserByEmail = async (logger: Logger, email: string) => {
  logger.info({ message: `Getting user by ${email}` });

  try {
    const userRepo = AppDataSource.getRepository(UserSchema);
    const user = await userRepo.findOne({
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

    return user as unknown as IUser;
  } catch (error) {
    throw new ServerError("Get user by email failed", error.message);
  }
};

export default {
    getUserByEmail
}
