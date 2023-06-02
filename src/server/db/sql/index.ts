/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFile, IQueryFileOptions } from 'pg-promise';
import { join as joinPath } from 'path';

/// ////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file: string): QueryFile {
  const fullPath: string = joinPath(__dirname, file); // generating full path;

  const options: IQueryFileOptions = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}

/// ////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query logic and its formatting parameters. However, this
// is very easy to overcome by using only Named Parameters for your query formatting.
/// /////////////////////////////////////////////////////////////////////////////////////////////

export const example = {
  getMessage: sql('example/get-message.sql'),
  postMessage: sql('example/post-message.sql'),
};

/// ////////////////////////////////////////////////////////////////
// Possible alternative - enumerating all SQL files automatically:
// http://vitaly-t.github.io/pg-promise/utils.html#.enumSql
