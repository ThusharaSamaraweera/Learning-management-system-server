import { AppDataSource, InitMysqlDb } from "../config/database/connection";
import { UserSchema } from "../config/database/index";
import { NewUser } from "../modules";
import { ApplicationError } from "../utils/ErrorResponse";
import { Logger } from "../utils/logger/logger";

async function create(logger: Logger, user: NewUser) {
  try {
    await InitMysqlDb();
    logger.info({
      message: `Inserting new user: first name-${user.firstName} last name-${user.lastName} contact number-${user.contactNumber} email-${user.email} status-${user.status} role-${user.role}`,
    });
    const userRepo = AppDataSource.getRepository(UserSchema);
    await userRepo.insert(user);
  } catch (error) {
    logger.error(error.message)
    throw new ApplicationError(error.message);
  }
}

export default {
  create,
};
