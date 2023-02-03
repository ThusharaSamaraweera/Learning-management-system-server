import { NextFunction, Request, Response } from "express";
import { InitMysqlDb } from "../config/database/connection";
import { NewUser } from "../modules";
import userService from "../services/userService";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user: NewUser = req.body
    await userService.create(user)
    return res.json({user});
  } catch (error) {
    console.error(error)
  }
}

export default {
  createUser,
};
