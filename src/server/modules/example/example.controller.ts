import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { db } from 'server/db';
import { IExampleBody } from 'server/modules/example/interfaces/example.interface';

export class ExampleController {
  getMessageFromDatabase = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const message = await db.example.getMessage();
      return res.status(httpStatus.OK).send({ message: message?.value });
    } catch (error) {
      next(error);
    }
  };

  postMessageToDatabase = async (
    req: Request<{}, {}, IExampleBody, {}>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { message } = req.body;
      const result = await db.example.postMessage(message);
      return res.status(httpStatus.CREATED).send({ id: result?.id });
    } catch (error) {
      next(error);
    }
  };
}
