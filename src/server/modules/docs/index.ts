import { config } from 'server/config/config';
import healthzDocs, { healthzTag } from 'server/modules/docs/healthz.docs';
import exampleDocs, { exampleTag } from 'server/modules/docs/example.docs';

const basicInfo = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Intranet Application',
    description: 'Intranet Application API',
  },
};

const components = {
  securitySchemes: {
    oliasoft_auth: {
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: `${config.auth.authenticationServerBaseUrl}/connect/authorize`,
          tokenUrl: `${config.auth.authenticationServerBaseUrl}/connect/token`,
          scopes: {
            'intranet-api': 'access to Intranet Application api',
          },
        },
      },
    },
  },
  security: [
    {
      oliasoft_auth: [],
    },
  ],
};

const docs = {
  ...basicInfo,
  components,
  security: [
    {
      oliasoft_auth: [],
    },
  ],
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [healthzTag, exampleTag],
  paths: {
    ...healthzDocs,
    ...exampleDocs,
  },
};

export default docs;
