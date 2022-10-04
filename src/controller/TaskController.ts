import { Request, Response } from 'express';
import { PostgresDataSource } from '../data-source';
import { Task } from '../entity/Task';
const TaskRepository = PostgresDataSource.getRepository(Task);

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskRepository.find({
    order: {
      id: 'ASC',
    },
  });
  return res.json(tasks);
};

export const saveTask = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) throw new Error('Body is empty');
  const { title, description } = req.body;
  if (!title || !description) throw new Error('Bad Request');
  const task = await TaskRepository.save({
    title,
    description,
  });
  return res.status(201).json(task);
};

export const getTask = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const task = await TaskRepository.findOneBy({
    id: id,
  });
  if (!task) throw new Error('Task not found');
  return res.status(200).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) throw new Error('Body is empty');
  const { id } = req.params;

  const taskExist = await TaskRepository.findOneBy({
    id: +id,
  });
  if (!taskExist) throw new Error('Task not found');
  const taskUpdating = await TaskRepository.createQueryBuilder()
    .update(Task)
    .set(req.body)
    .where('id = :id', { id })
    .returning('*')
    .execute();

  const returnTask = taskUpdating.raw[0];
  if (Object.keys(returnTask).length === 0) throw new Error('Task not found');
  return res.json(returnTask);
};

export const updateFinished = async (req: Request, res: Response) => {
  console.log(req.params);
  const { id } = req.params;

  const verifyTrueOrFalse = await TaskRepository.findOneBy({ id: +id });

  return res.json(verifyTrueOrFalse);
};
