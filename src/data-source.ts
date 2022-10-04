import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './entity/Task';
import dotenv from 'dotenv';
dotenv.config();

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});
