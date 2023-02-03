import mysql from 'mysql2';
require('dotenv').config()
import { DataSource } from 'typeorm';
import { UserSchema } from './index';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT!) ,
    synchronize: false,
    logging: true,
    entities: [
      UserSchema
    ],
  });

let dataSource: DataSource;

export const InitMysqlDb = async () => {
    if (!dataSource) {
      dataSource = await AppDataSource.initialize();
    }
  };
