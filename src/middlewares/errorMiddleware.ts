import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('aqui!!!');
  console.error(err.stack);

  const response = {
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(err.status || 500).json(response);
};