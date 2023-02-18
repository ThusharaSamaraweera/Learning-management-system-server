import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { USER_ROLES } from "../constants/constants";
import { NewUser } from "../modules";
import authService from "../services/authService";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { validate } from "./validate";

const validateSignup = async (req: Request, res: Response, next: NextFunction) => {
  const data: NewUser = req.body;
  try {
    await authService.checkEmailExists(data.email); 
  
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(50).required(),
      lastName: Joi.string().min(3).max(50),
      email: Joi.string().email(),
      contactNumber: Joi.string().length(10),
      password: Joi.string().min(8).max(48).required(),
      role: Joi.string().valid(USER_ROLES.ADMIN, USER_ROLES.USER).required(),
    });
  
    req.body = validate(schema, data);
    next();
    
  } catch (error) {
    if(error instanceof BadRequestError){
      next(new BadRequestError(undefined, error.description))
    }
    next(error)
  }
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const data: NewUser = req.body;
  try {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(8).max(48).required(),
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


export default {
  validateSignup,
  validateLogin
};
