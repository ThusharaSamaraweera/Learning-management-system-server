import mysql from "mysql2";
require("dotenv").config();
import { DataSource } from "typeorm";
import { MYSQL_SERVICE } from "../../../constants/logConstants";
import { Logger } from "../../../utils/logger/logger";
import { user } from "./Entities/User";
import { Department } from "./Entities/Department";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!),
  synchronize: false,
  logging: true,
  entities: [user, Department],
  migrations: ["src/data/database/mysql/migration/**/*.ts"],
});

let dataSource: DataSource;

export const InitMysqlDb = async () => {
  const logger = new Logger(MYSQL_SERVICE);
  try {
    if (!dataSource) {
      logger.info({ message: "Getting a new MySql connection ..." });
      dataSource = await AppDataSource.initialize();
    }
    
  } catch (error) {
    logger.error({message: error.message})
  }
};
