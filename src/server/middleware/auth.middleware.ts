import { AuthenticationMiddlewares } from '@oliasoft/authentication';

import { config } from 'server/config/config';

const authenticationMiddleware = AuthenticationMiddlewares.authenticate({
  authenticationServerBaseUrl: config.auth.authenticationServerBaseUrl,
  rejectUnauthorized: config.auth.useSslForAuthentication,
  audience: 'intranet-api',
  scope: 'intranet-api',
});

export default authenticationMiddleware;
