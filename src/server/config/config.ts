import serverconfig, { APP_ENVS } from 'server/srvconf';

const config = {
  env: serverconfig.get('env'),
  apiBaseUrl: serverconfig.get('api_base_url'),
  port: serverconfig.get('listen_port'),
  logQuery: serverconfig.get('log_query'),
  clientId: serverconfig.get('client_id'),
  db: {
    connectionString: serverconfig.get('database_connection_string'),
    connectionStringMigrator: serverconfig.get(
      'database_connection_string_migrator',
    ),
  },
  auth: {
    useSslForAuthentication: serverconfig.get('use_ssl_for_authentication'),
    authenticationServerBaseUrl: serverconfig.get(
      'authentication_server_base_url',
    ),
  },
};

export { config, APP_ENVS };
