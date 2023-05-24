import { NextFunction, Request, Response } from "express";
import { COURSE_SERVICE } from "../constants/logConstants";
import { Logger } from "../utils/logger/logger";
import { apiResponse } from "../utils/successResponse";
import courseService from "../services/course.service";
import { INewCourse } from "../modules";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(COURSE_SERVICE);

  try {
    const newCourse: INewCourse = req.body;
    const userEmail = req.body?.user?.email;
    logger.info({ message: "Calling createCourse" });
    await courseService.createCourse(logger, newCourse, userEmail);
    return res.json(apiResponse._200({ newCourse }));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export default { createCourse };
