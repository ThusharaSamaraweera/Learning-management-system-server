import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ACADEMIC_YEAR, COURSE_LEVEL, FACULTY, NewUser } from "../modules";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { validate } from "./validate";

const validateCreateCourse = async (req: Request, res: Response, next: NextFunction) => {
  const data: NewUser = req.body;
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(1000).required(),
      level: Joi.string().valid(COURSE_LEVEL).required(),
      academicYear: Joi.string().valid(ACADEMIC_YEAR).required(),
      faculty: Joi.string().valid(FACULTY).required(),
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
