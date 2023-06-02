import { spawn } from 'child_process';
import { resolve } from 'path';
import { config } from 'server/config/config';

const run = async () => {
  const migrationsPath = resolve(__dirname, './migrations');
  const command = `migrator --db='${config.db.connectionStringMigrator}' --dir='${migrationsPath}'`;
  const child = spawn(command, ['--color=always'], { shell: true });
  child.stdout.on('data', (data) => console.log(data.toString()));
  child.stderr.on('data', (data) => console.error(data.toString()));
  child.on('exit', process.exit);
};

run().then();
