import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export class IndexController {
  get = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      return res.status(httpStatus.OK).send({ example: 'Intranet API Server' });
    } catch (error) {
      next(error);
    }
  };
}
