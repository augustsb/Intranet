import { Schema } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import validateSchema from 'server/modules/validation/validate-schema';
import ValidationError from 'server/modules/validation/errors/validation-error';
import ApiError from 'server/modules/validation/errors/api-error';

export enum DataLocation {
  body = 'body',
  params = 'params',
  query = 'query',
}

const validationMiddleware = (
  schema: Schema,
  dataLocation: DataLocation = DataLocation.body,
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = req[dataLocation];

    if (!data) {
      const msg = `Data location ${dataLocation} is not allowed.`;
      next(new ApiError(httpStatus.BAD_REQUEST, msg));
      return;
    }
    const { valid, errors } = validateSchema(data, schema);

    if (!valid) {
      // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
      // @ts-ignore
      next(new ValidationError(errors));
      return;
    }

    next();
  };
};

export default validationMiddleware;
