import { Response, Router } from 'express';
import * as runtimeConfigStaticMiddleware from 'server/middleware/runtime-config-static.middleware';
import docs from 'server/modules/docs';
import swaggerUI from 'swagger-ui-express';
import { config } from 'server/config/config';

const rootRoutes = (): Router => {
  const router = Router();

  router.get('/healthz', (_req, res: Response) =>
    res.status(200).send({ msg: 'alive' }),
  );

  // Special handling of runtimeConfigStatic.js script, to serve config to be consumed at client:
  router.get(
    '/runtimeConfigStatic.js',
    runtimeConfigStaticMiddleware.buildHandleRequest(),
  );
  router.get('/api-docs/swagger.json', (_req, res) => res.json(docs));
  router.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(docs, {
      // hide client_secret field from the ui
      customCss:
        '#client_secret, label[for="client_secret"], label[for="client_secret"] ~ * {display: none}',
      swaggerOptions: {
        url: '/api-docs/swagger.json',
        oauth2RedirectUrl: `${config.apiBaseUrl}/api-docs/oauth2-redirect.html`,
        oauth: {
          clientId: config.clientId, // default clientId
          scopes: ['intranet-api'], // default scopes
          usePkceWithAuthorizationCodeGrant: true,
        },
      },
    }),
  );

  return router;
};

export default rootRoutes;
