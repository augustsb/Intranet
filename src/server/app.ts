import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';

import { APP_ENVS, config } from 'server/config/config';
import logRequest from 'server/middleware/log-request';
import apiRoutes from 'server/api-routes';
import rootRoutes from 'server/root-routes';
import {
  errorConverter,
  errorHandler,
} from 'server/middleware/error.middleware';
import ApiError from 'server/modules/validation/errors/api-error';
import authenticationMiddleware from 'server/middleware/auth.middleware';

const app = express();

app.use(logRequest);

app.use(
  helmet({
    // https://helmetjs.github.io/#cross-origin-resource-policy
    crossOriginResourcePolicy: {
      policy: 'same-site',
    },
    crossOriginOpenerPolicy: {
      policy: 'unsafe-none', // https://github.com/swagger-api/swagger-ui/issues/8030
    },
  }),
);
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
const corsOptions: cors.CorsOptions = {};
if (config.env === APP_ENVS.DEVELOPMENT) {
  corsOptions.origin = 'http://localhost:9010';
}
app.use(cors(corsOptions));

const apiRouter = apiRoutes();
const rootRouter = rootRoutes();

app.use('/', rootRouter);
app.use('/api', authenticationMiddleware, apiRouter);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
