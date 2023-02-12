import { AppDataSource, InitMysqlDb } from "../config/database/connection";
import { UserSchema } from "../config/database/index";
import { USER_STATUS } from "../constants/constants";
import { NewUser } from "../modules";
import { ServerError } from "../utils/errorHandling/ErrorResponse";
// import { ApplicationError } from "../utils/ErrorResponse";
import { Logger } from "../utils/logger/logger";

async function create(logger: Logger, user: NewUser) {
  try {
    await InitMysqlDb();
    logger.info({
      message: `Inserting new user: first name-${user.firstName} last name-${user.lastName} contact number-${user.contactNumber} email-${user.email} role-${user.role}`,
    });
    const userRepo = AppDataSource.getRepository(UserSchema);

    await userRepo.insert({ ...user, status: USER_STATUS.ACTIVE });
  } catch (error) {
    throw new ServerError("User creation failed", error.message);
  }
}

export default {
  create,
};
