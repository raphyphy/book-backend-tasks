import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/app.error';
import { logger } from '../helper';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    if (err.message) {
      logger.error(err.message);
      return res.status(err.HttpStatusCode).json(err.JSON);
    } else {
      return res.sendStatus(err.HttpStatusCode);
    }
  }
  next(err)
};

// TODO: Handler for non request errors (e.g. database-related errors, third-party api errors, etc.)
