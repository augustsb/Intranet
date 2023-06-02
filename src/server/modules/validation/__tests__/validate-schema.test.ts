import validateSchema from '../validate-schema';

describe('Schema validation', () => {
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['name'],
  };

  it('should successfully validate simple data', () => {
    const data = {
      name: 'Test name',
    };
    const { valid } = validateSchema(data, schema);
    expect(valid).toBe(true);
  });

  it('should fail to validate missing property', () => {
    const data = {
      anotherName: 'Test name',
    };
    const { valid, errors } = validateSchema(data, schema);
    expect(valid).toBe(false);
    expect(errors).toHaveLength(1);
  });

  it('should fail to validate minimum length constraint', () => {
    const data = {
      name: '',
    };
    const { valid, errors } = validateSchema(data, schema);
    expect(valid).toBe(false);
    expect(errors).toHaveLength(1);
  });
});
