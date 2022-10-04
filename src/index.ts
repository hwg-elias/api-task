import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import { PostgresDataSource } from './data-source';
import { routes } from './routes';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandler';
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

PostgresDataSource.initialize();

app.use(routes);
app.use(errorHandler);
app.listen(3000);
