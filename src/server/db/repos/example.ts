import { IDatabase } from 'pg-promise';
import { Example } from 'server/db/models';
import { example as sql } from 'server/db/sql';

export class ExampleRepository {
  constructor(private db: IDatabase<any>) {}

  async getMessage(): Promise<Example | null> {
    return this.db.oneOrNone(sql.getMessage);
  }

  async postMessage(message: string): Promise<Example | null> {
    return this.db.one(sql.postMessage, { message });
  }
}
