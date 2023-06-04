import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ACADEMIC_YEAR, COURSE_LEVEL, FACULTY, INewCourse } from "../modules";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { validate } from "./validate";
import { Logger } from "../utils/logger/logger";
import { COURSE_SERVICE } from "../constants/logConstants";

const validateCreateCourse = (req: Request, res: Response, next: NextFunction) => {
  const data: INewCourse = req.body;
  const logger = new Logger(COURSE_SERVICE)
  logger.info({ message: `Validating create course request: name-${data.name}` });
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().max(1000),
      level: Joi.string().valid(...Object.values(COURSE_LEVEL)).required(),
      academicYear: Joi.string().valid(...Object.keys(ACADEMIC_YEAR)).required(),
      faculty: Joi.string().valid(...Object.keys(FACULTY)).required(),
      department: Joi.number().required(),
    });

    req.body = validate(schema, data);
    logger.info({ message: `Successfully validated create course request: name-${data.name}` });
    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(new BadRequestError(undefined, error.description));
    }
    logger.error({ message: `Error validating create course request: name-${data.name}` });
    next(error);
  }
};

export default { validateCreateCourse };
