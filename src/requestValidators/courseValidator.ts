import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ACADEMIC_YEAR, COURSE_LEVEL, FACULTY, INewCourse } from "../modules";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { validate } from "./validate";

const validateCreateCourse = (req: Request, res: Response, next: NextFunction) => {
  const data: INewCourse = req.body;

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
    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(new BadRequestError(undefined, error.description));
    }
    next(error);
  }
};

export default { validateCreateCourse };
