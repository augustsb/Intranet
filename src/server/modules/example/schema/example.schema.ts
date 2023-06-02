import { PropertiesSchema } from 'ajv/dist/types/json-schema';
import { IExampleBody } from 'server/modules/example/interfaces/example.interface';

const exampleProperties: PropertiesSchema<IExampleBody> = {
  message: {
    type: 'string',
    minLength: 5,
  },
};

export const exampleSchema = {
  type: 'object',
  properties: exampleProperties,
  required: ['message'],
  additionalProperties: false,
};
