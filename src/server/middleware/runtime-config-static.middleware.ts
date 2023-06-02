import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import logger from 'server/config/logger';
import ApiError from 'server/modules/validation/errors/api-error';
import * as config from 'server/clientconf';

export const buildHandleRequest =
  () =>
  (_req: Request, res: Response, next: NextFunction): void => {
    try {
      res.json(config.getPublicConfig());
    } catch (error) {
      logger.error(error);
      const e = error as Error;
      next(
        new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          e.message,
          false,
          e.stack,
        ),
      );
    }
  };
