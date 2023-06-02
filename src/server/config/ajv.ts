import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvKeywords from 'ajv-keywords';

const ajv = new Ajv({
  strictTuples: false,
  allErrors: true,
  verbose: true,
  $data: true,
  useDefaults: true,
});

ajvErrors(ajv);
ajvKeywords(ajv);

export default ajv;
