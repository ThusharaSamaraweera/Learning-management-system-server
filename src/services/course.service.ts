import { WeekModelSchema } from "../data/database/mongodb/models/weekContent.schema.model";
import { CourseSchema } from "../data/database/mysql";
import { AppDataSource } from "../data/database/mysql/connection";
import { INewCourse, IWeekContent, WEEK_CONTENT_TYPE } from "../modules";
import { Logger } from "../utils/logger/logger";
import departmentService from "./department.service";

async function createCourse(logger: Logger, course: INewCourse, userEmail: string) {
  logger.info({ message: `Inserting new course: name-${course.name}` });
  const courseRepo = AppDataSource.getRepository(CourseSchema);

  const department = await departmentService.getDepartment(logger, course?.department);

  if (department) {
    const newCourse = await courseRepo.insert({
      name: course.name,
      description: course.description,
      level: course.level,
      academicYear: course.academicYear,
      faculty: course.faculty,
      department: department,
      createdBy: userEmail
    });

    logger.info({ message: `Successfully inserted new course: name-${course.name}` });

    // Adding general content for new course
    const weekContent: IWeekContent = course.weekContent;
    weekContent.startingDate = getMonday(new Date());
    weekContent.type  = WEEK_CONTENT_TYPE.GENERAL
    weekContent.courseId = newCourse.identifiers[0].id;
    weekContent.title = 'General'
    weekContent.weekNumber = 0;
    await addWeekContent(logger, weekContent);

    return {newCourseId: newCourse.identifiers[0].id, department};
  }
}

export const addWeekContent =async (logger: Logger, WeekContent: IWeekContent) => {
  logger.info({
    message: `Inserting new week content: courseId-${WeekContent.courseId}, weekNumber-${WeekContent.weekNumber}`,
  });
  try {
    const newWeekContent = new WeekModelSchema({...WeekContent})
    const result = await newWeekContent.save();
    logger.info({ 
      message: `Successfully inserted new week content: courseId-${WeekContent.courseId}, weekNumber-${WeekContent.weekNumber}`,
    });
    return result;
  } catch (error) {
    logger.error({
      message: `Error inserting new week content: courseId-${WeekContent.courseId}, weekNumber-${WeekContent.weekNumber}`,
    });
    throw error;
  }
}

const getMonday = (d: Date) => {
  var day = d.getDay() || 7; // Get current day number, converting Sun. to 7

  if (day !== 1)
    // Only manipulate the date if it isn't Mon.
    d.setHours(-24 * (day - 1));

  return d;
}

export default { createCourse };