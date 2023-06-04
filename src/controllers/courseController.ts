import { NextFunction, Request, Response } from "express";
import { COURSE_SERVICE } from "../constants/logConstants";
import { Logger } from "../utils/logger/logger";
import { apiResponse } from "../utils/successResponse";
import courseService from "../services/course.service";
import { ICourse, INewCourse } from "../modules";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(COURSE_SERVICE);

  try {
    const newCourse: INewCourse = req.body;
    const userEmail = req.body?.user?.email;
    logger.info({ message: `Calling createCourse ${JSON.stringify(newCourse)}` });
    const result = await courseService.createCourse(logger, newCourse, userEmail);
    if( result?.department && result.newCourseId) {
      const addedCourse: ICourse = { ...newCourse, id: result?.newCourseId, department: result.department};
      return res.json(apiResponse._200({ newCourse: addedCourse }));
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export default { createCourse };
