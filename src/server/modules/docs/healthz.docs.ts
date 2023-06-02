export const healthzTag = {
  name: 'Health',
  description: 'Readiness and Liveliness probe',
};

const tags = [healthzTag.name];

const getRoute = {
  tags,
  description: 'Health probe',
  basePath: '/',
  responses: {
    200: {
      description: 'Check if server api is alive',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
              },
            },
            example: {
              msg: 'Alive',
            },
          },
        },
      },
    },
  },
};

const healthzDocs = {
  '/healthz': {
    servers: [
      {
        url: '/',
      },
    ],
    get: getRoute,
  },
};

export default healthzDocs;
