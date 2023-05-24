import { CourseSchema, UserSchema } from "../data/database/mysql";
import { AppDataSource } from "../data/database/mysql/connection";
import { IUser } from "../modules";
import { BadRequestError, ServerError } from "../utils/errorHandling/ErrorResponse";
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
        courses: true,
      },
      relations: {
        courses: true,
      }
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

const checkCourseExists = async (logger: Logger, courseId: string) => {
  logger.info({ message: `Checking if course exists` });
  try {
    const courseRepo = AppDataSource.getRepository(CourseSchema);
    const course = await courseRepo.findOne({
      where: {
        id: courseId,
      },
    });
    if(!course){
      throw new BadRequestError(`Course with ${courseId} does not exist`, "");
    }
    return course;
  } catch (error) {
    if(error instanceof BadRequestError){
      throw error;
    }
    logger.error({message: error.message})
    throw new ServerError("Check course exists failed", error.message);
  }
}

const enrollToCourse = async (logger: Logger, userId: string, courseId: string) => {
  logger.info({ message: `Enrolling user to course` });
  try {
    const userRepo = AppDataSource.getRepository(UserSchema);
    const user = await userRepo.findOne({
      select: {
        id: true,
        courses: true,
      },
      where: {
        id: userId,
      },
      relations: {
        courses: true,
      }
    });
    if(!user){
      throw new BadRequestError(`User with ${userId} does not exist`, "");
    }
    const course = await checkCourseExists(logger, courseId);
    user.courses.push(course);
    await userRepo.save(user);
    return user;
  } catch (error) {
    if(error instanceof BadRequestError){
      throw error;
    }
    logger.error({message: error.message})
    throw new ServerError("Enroll user to course failed", error.message);
  }     
}
export default {
  getUserByEmail,
  getUsers,
  enrollToCourse,
  checkCourseExists
};
