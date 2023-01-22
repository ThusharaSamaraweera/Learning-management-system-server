import { NextFunction, Request, Response } from "express";
import { InitMysqlDb } from "../config/database/connection";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    await InitMysqlDb()
    return res.json();
  } catch (error) {
    console.error(error)
  }
}

export default {
  createUser,
};
