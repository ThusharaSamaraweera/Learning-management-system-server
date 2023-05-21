import { DepartmentSchema } from "../data/database/mysql";
import { CourseSchema } from "../data/database/mysql";
import { AppDataSource } from "../data/database/mysql/connection";
import { ICourse, INewCourse } from "../modules";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger/logger";
import departmentService from "./department.service";

async function createCourse(logger: Logger, course: INewCourse, userEmail: string,) {
  logger.info({ message: `Inserting new course: name-${course.name}` });
  const courseRepo = AppDataSource.getRepository(CourseSchema);

  const department = await departmentService.getDepartment(logger, course?.department);

  if (department) {
    await courseRepo.insert({
      name: course.name,
      description: course.description,
      level: course.level,
      academicYear: course.academicYear,
      faculty: course.faculty,
      department: department,
      createdBy: userEmail
    });
  }
}

export default { createCourse };