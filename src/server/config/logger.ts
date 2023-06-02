import path from 'path';
import { inspect } from 'util';
import { transports, createLogger, format } from 'winston';

import { config, APP_ENVS } from 'server/config/config';

const LEVELS = {
  INFO: 'info',
  ERROR: 'error',
  DEBUG: 'debug',
};

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const todayDate = new Date().toISOString().substring(0, 10);
const commonPath = `/var/tmp/notification-service/logs/${todayDate}`;
const allFile = path.resolve(`${commonPath}/all.log`);
const exceptionsFile = path.resolve(`${commonPath}/exceptions.log`);
const SPLAT = Symbol.for('splat') as unknown as string; // Ref. https://github.com/Microsoft/TypeScript/issues/24587#issuecomment-460650063
const MESSAGE_SPLAT = Symbol.for('message') as unknown as string; // Ref. https://github.com/Microsoft/TypeScript/issues/24587#issuecomment-460650063

const isPrimitive = (val: any) => {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
};

const formatWithInspect = (val: any) => {
  const prefix = isPrimitive(val) ? '' : '\n';
  const shouldFormat = typeof val !== 'string';

  return (
    prefix + (shouldFormat ? inspect(val, { depth: null, colors: true }) : val)
  );
};

const commonFormats = [
  enumerateErrorFormat(),
  format.timestamp(),
  format.errors({ stack: true }),
];

const consoleFormats = [
  ...commonFormats,
  format.printf((info) => {
    const msg = formatWithInspect(info.message);
    const splatArgs = info[SPLAT] || [];
    const rest = splatArgs.map((data: any) => JSON.stringify(data)).join(' ');

    return `[${info.timestamp}] ${info.level}: ${msg} ${rest}`;
  }),
];

const fileFormats = [
  format.timestamp(),
  format.printf((info) => {
    let msg = info.message;
    if (info.message.includes('[object Object]')) {
      const { message } = JSON.parse(info[MESSAGE_SPLAT]);
      msg = JSON.stringify(message);
    }
    const splatArgs = info[SPLAT] || [];
    const rest = splatArgs.map((data: any) => JSON.stringify(data)).join(' ');

    return `[${info.timestamp}] ${info.level}: ${msg} ${rest}`;
  }),
];

const logger = createLogger({
  level: config.env === APP_ENVS.DEVELOPMENT ? LEVELS.DEBUG : LEVELS.INFO,
  exitOnError: false,
  transports: [
    new transports.Console({
      level: config.env === APP_ENVS.DEVELOPMENT ? LEVELS.DEBUG : LEVELS.INFO,
      format: format.combine(
        config.env === APP_ENVS.DEVELOPMENT
          ? format.colorize()
          : format.uncolorize(),
        ...consoleFormats,
      ),
    }),
    new transports.File({
      filename: allFile,
      format: format.combine(format.uncolorize(), ...fileFormats),
      level: LEVELS.DEBUG,
    }),
  ],
  exceptionHandlers: [
    new transports.Console({
      level: LEVELS.ERROR,
      handleExceptions: true,
      format: format.combine(
        config.env === APP_ENVS.DEVELOPMENT
          ? format.colorize()
          : format.uncolorize(),
        ...consoleFormats,
      ),
    }),
    new transports.File({
      filename: exceptionsFile,
      level: LEVELS.ERROR,
      format: format.combine(format.uncolorize(), ...fileFormats),
    }),
  ],
});

export default logger;
