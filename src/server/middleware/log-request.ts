import { Response, Request, NextFunction } from 'express';

import logger from 'server/config/logger';

const requestLogHandler = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const elapsed = process.hrtime(start);
    const ms = (elapsed[0] * 1e3 + elapsed[1] * 1e-6).toFixed(3);
    const date = new Date().toISOString();
    const url = req.originalUrl || req.url;
    const message = `[${date}] ${req.ip}:${req.method} ${url} ${res.statusCode} - ${ms} ms`;
    if (res.statusCode >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  });
  return next();
};

export default requestLogHandler;
