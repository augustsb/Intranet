import logger from 'server/config/logger';
import { config } from './config/config';
import app from './app';
import { db } from './db';

db.oneOrNone('SELECT 1 + 1 AS result;')
  // @ts-ignore
  .then(({ result }) => {
    logger.info(`SELECT 1 + 1 = ${result}. Connection probe successful.`);
  })
  // @ts-ignore
  .catch((e) => {
    logger.error('Unable to connect to the database:', e);
  });

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const unexpectedErrorHandler = (error: Error) => {
  logger.error('Unexpected error', error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

export default server;
