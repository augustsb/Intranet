import convict from 'convict';
import isURL from 'validator/lib/isURL';
import { url, email, ipaddress } from 'convict-format-with-validator';
import { resolve } from 'path';

export const APP_ENVS = Object.freeze({
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
  OS_TEST: 'os-test',
  OS_PROD: 'os-prod',
});

const envName = {
  name: 'env-name',
  validate: (val: string) => {
    const validEnvNames = Object.values(APP_ENVS);
    const err = () =>
      new Error(
        `must be a string in range [${validEnvNames.join(', ')}, 'review-*']`,
      );
    if (typeof val !== 'string') {
      throw err();
    }
    if (
      !validEnvNames.some((env) => val === env) &&
      !val.startsWith('review-')
    ) {
      throw err();
    }
  },
};

const postgresUrl = {
  name: 'postgres-url',
  validate: (val: string) => {
    return isURL(val, { protocols: ['postgres'] });
  },
};

const redisUrl = {
  name: 'redis-url',
  validate: (val: string) => {
    return isURL(val, { protocols: ['redis'] });
  },
};

const wsUrl = {
  name: 'websocket-url',
  validate: (val: string) => {
    return isURL(val, { protocols: ['ws', 'wss'] });
  },
};

convict.addFormat(url);
convict.addFormat(email);
convict.addFormat(ipaddress);
convict.addFormat(envName);
convict.addFormat(postgresUrl);
convict.addFormat(redisUrl);
convict.addFormat(wsUrl);

export type ConfigFormats =
  | convict.PredefinedFormat
  | 'env-name'
  | 'postgres-url'
  | 'redis-url'
  | 'ws-url';
export interface ConfigSchemaObj
  extends convict.SchemaObj<string | number | boolean | null | undefined> {
  public?: boolean;
  format?: ConfigFormats;
}

export type ConfigSchema = {
  [k: string]: ConfigSchemaObj | { [kn: string]: ConfigSchemaObj };
};

export const configSchema = {
  env: {
    doc: 'The application environment.',
    format: envName.name,
    default: 'development',
    env: 'NODE_ENV',
  },
  database_connection_string: {
    doc: 'Connection string to intranet database for application user',
    default: 'postgres://USERNAME:PASSWORD@localhost:5432/DATABASE',
    env: 'PG_DATABASE_CONNECTION_STRING',
    format: postgresUrl.name,
    sensitive: true,
  },
  database_connection_string_migrator: {
    doc: 'Connection string to intranet database for migrator user',
    default: 'postgres://USERNAME:PASSWORD@localhost:5432/DATABASE',
    env: 'PG_DATABASE_CONNECTION_STRING_MIGRATOR',
    format: postgresUrl.name,
    sensitive: true,
  },
  listen_port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 9011,
    env: 'PORT',
    arg: 'port',
  },
  log_query: {
    doc: 'Flag for logging queries to console, from pg-promise useful for local debugging',
    format: 'Boolean',
    default: false,
    env: 'LOG_QUERY',
  },
  authentication_server_base_url: {
    doc: 'Url to the authN service (IdentityServer)',
    format: url.name,
    default: 'https://login.test.oliasoft.com',
    env: 'AUTHENTICATION_SERVER_BASE_ADR',
    public: true,
  },
  api_base_url: {
    doc: 'Url to this API (Intranet)',
    format: url.name,
    default: 'http://localhost:9011',
    env: 'API_SERVER_BASE_ADR',
    public: true,
  },
  client_id: {
    doc: 'The client id, e.g. intranet',
    format: 'String',
    default: 'intranet',
    env: 'CLIENT_ID',
  },
  use_ssl_for_authentication: {
    format: Boolean,
    default: false,
    env: 'USE_SSL_FOR_AUTHENTICATION',
  },
};

const config = convict(configSchema);

const env = config.get('env');
const envSpecificConfigFile = `./srvconf-${env}.json`;
config.loadFile(resolve(__dirname, envSpecificConfigFile));

// Perform validation:
config.validate({ allowed: 'strict' });

export default config;
