import httpStatus from 'http-status';

import ApiError from './api-error';

class ValidationError extends ApiError {
  errorMessages: string[];

  name = 'ValidationError';

  constructor(errorMessages: string[], message = 'Schema validation failed.') {
    super(httpStatus.BAD_REQUEST, message);
    this.errorMessages = errorMessages;
  }
}

export default ValidationError;
