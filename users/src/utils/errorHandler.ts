import { Response } from 'express';

export function errorHandler(error: any, res: Response) {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof TypeError) {
    statusCode = 500;
    message = 'Internal server error';
  }
  if (error instanceof Error) {
    statusCode = 400;
    message = 'Bad request';
  }
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Bad request';
    error.errors = Object.values(error.errors).map((err: any) => err.message);
  }
  res.status(statusCode).json({ status: 'error', message: message, error: error.message });
}
