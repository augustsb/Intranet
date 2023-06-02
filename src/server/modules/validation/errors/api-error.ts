class ApiError extends Error {
  statusCode?: number;

  isOperational?: boolean; // Operational error is the runtime error. It doesn't mean application itself has bugs

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
