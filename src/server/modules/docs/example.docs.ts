import { exampleSchema } from 'server/modules/example/schema/example.schema';

export const exampleTag = {
  name: 'Example',
  description: 'Example entity',
};

const tags = [exampleTag.name];

const getRoute = {
  tags,
  description: 'Example',
  basePath: '/example',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

const postRoute = {
  tags,
  description: 'Example',
  basePath: '/example',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: exampleSchema,
        example: {
          message: 'Some message',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: exampleSchema,
        },
      },
    },
  },
};

const exampleDocs = {
  '/example': {
    get: getRoute,
    post: postRoute,
  },
};

export default exampleDocs;
