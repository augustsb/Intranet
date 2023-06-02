import { Schema, ErrorObject } from 'ajv';

import ajv from 'server/config/ajv';

interface ValidateReturn {
  valid: boolean;
  errors: (string | undefined)[] | undefined;
}

/**
 * Validate passed data versus passed json schema
 * @param data
 * @param schema
 *
 * @return {ValidateReturn} object
 */
const validateSchema = (data: unknown, schema: Schema): ValidateReturn => {
  const v = ajv.compile(schema);
  const valid = v(data);
  const errorMessages = v.errors?.map(({ message }: ErrorObject) => message);

  return { valid, errors: errorMessages };
};

export default validateSchema;
