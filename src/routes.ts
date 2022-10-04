import { Router } from 'express';
import {
  getTasks,
  saveTask,
  getTask,
  updateTask,
  updateFinished,
} from './controller/TaskController';

const routes = Router();

routes.get('/tasks', getTasks);
routes.get('/tasks/:id', getTask);
routes.put('/task-update/:id', updateTask);
routes.patch('/task-finished/:id', updateFinished);
routes.post('/save-task', saveTask);

export { routes };
