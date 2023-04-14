import mysql from "mysql2";
require("dotenv").config();
import { DataSource } from "typeorm";
import { UserSchema } from "./index";
import { MYSQL_SERVICE } from "../../../constants/logConstants";
import { Logger } from "../../../utils/logger/logger";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!),
  synchronize: false,
  logging: true,
  entities: [UserSchema],
});

let dataSource: DataSource;

export const InitMysqlDb = async () => {
  const logger = new Logger(MYSQL_SERVICE);
  if (!dataSource) {
    logger.info({ message: "Getting a new MySql connection ..." });
    dataSource = await AppDataSource.initialize();
  }
};
