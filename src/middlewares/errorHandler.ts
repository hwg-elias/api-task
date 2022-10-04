import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export const errorHandler: ErrorRequestHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    return res.status(400).json({
      status: 400,
      error: err.message,
    });
  }
  return res.status(500).json({
    status: 500,
    error: 'Unexpected Internal Error',
  });
};
