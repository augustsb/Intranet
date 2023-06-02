import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { UnauthenticatedError } from '@oliasoft/authentication';

import { APP_ENVS, config } from 'server/config/config';
import logger from 'server/config/logger';
import ApiError from 'server/modules/validation/errors/api-error';
import ValidationError from 'server/modules/validation/errors/validation-error';

// eslint-disable-next-line
const errorConverter = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  let error = err;
  if (err instanceof UnauthenticatedError) {
    error = new ApiError(
      httpStatus.UNAUTHORIZED,
      error.message,
      true,
      err.stack,
    );
    return next(error);
  }

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode]?.toString();
    error = new ApiError(statusCode, message, true, err.stack);
  }

  return next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (
  err: ApiError & ValidationError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Response => {
  let { statusCode = httpStatus.BAD_REQUEST, message } = err;
  const { errorMessages, isOperational } = err;
  if (config.env === APP_ENVS.PRODUCTION && !isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR].toString();
  }

  const response = {
    code: statusCode,
    message,
    errorMessages,
    ...(config.env === APP_ENVS.DEVELOPMENT && { stack: err.stack }),
  };

  logger.error(err.message, err?.errorMessages);

  return res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
