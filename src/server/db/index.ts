/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as promise from 'bluebird'; // best promise library today
import pgPromise, { IInitOptions, IDatabase, IMain } from 'pg-promise';
import logger from 'server/config/logger';
import { config } from 'server/config/config';
import { IExtensions, ExampleRepository } from 'server/db/repos';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  // Using a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise,

  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    // obj.example = new ExampleRepository(obj, pgp);
    obj.example = new ExampleRepository(obj);
  },
  ...(config.logQuery
    ? {
        query(e) {
          logger.debug(e.query);
        },
      }
    : {}),
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp(config.db.connectionString);

// Initializing optional diagnostics:
// Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
export { db, pgp };
