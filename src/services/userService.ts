import { AppDataSource, InitMysqlDb } from "../config/database/connection";
import { UserSchema } from "../config/database/index";
import { NewUser } from "../modules";
import { Logger } from "../utils/logger/logger";

async function create(logger: Logger, user: NewUser) {
  try {
    await InitMysqlDb();
    logger.info({
      message: `Inserting new user: first name-${user.firstName} last name-${user.LastName} contact number-${user.contactNumber} email-${user.email} status-${user.status} role-${user.role}`,
    });
    const userRepo = AppDataSource.getRepository(UserSchema);
    userRepo.insert(user);
  } catch (error) {
    console.log(error);
  }
}

export default {
  create,
};
