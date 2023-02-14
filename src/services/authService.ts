import { AppDataSource, InitMysqlDb } from "../config/database/connection";
import { UserSchema } from "../config/database/index";
import { USER_STATUS } from "../constants/constants";
import { NewUser } from "../modules";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
import { logger, Logger } from "../utils/logger/logger";

async function signup(logger: Logger, user: NewUser) {
  try {
    await InitMysqlDb();
    logger.info({
      message: `Inserting new user: first name-${user.firstName} last name-${user.lastName} email-${user.email}`,
    });
    const userRepo = AppDataSource.getRepository(UserSchema);

    await userRepo.insert({ ...user, status: USER_STATUS.ACTIVE });
  } catch (error) {
    throw new ServerError("User creation failed", error.message);
  }
}

async function login(logger: Logger, loginDetails: any){
  try {
    await InitMysqlDb()

  } catch (error) {
    throw new ServerError("Login failed",error.message)
  }
}

export async function checkEmailExists(email: string) {
  try {
    await InitMysqlDb();
    logger.info({message: `Validating ${email} already exists or not`})
    const userRepo = AppDataSource.getRepository(UserSchema)
    const existingEamilUserId = await userRepo.findOne({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true
      },
    })
    
    if(existingEamilUserId && existingEamilUserId?.id) throw new BadRequestError(`${email} already exists`, "");

  } catch (error) {
    console.log('err', JSON.stringify(error))
    if(error instanceof BadRequestError) throw new BadRequestError(undefined, error.description);
    throw new ServerError(undefined, error.message)
  }
}



export default {
  signup,
};
