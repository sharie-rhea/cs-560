import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect, Generated } from 'kysely';

export interface JournalEntryTable {
  id: Generated<number>;
  date: string;
  activity_type: string;
  description: string;
  created_at: Generated<string>;
}

export interface Database {
  journal_entries: JournalEntryTable;
}

const dbPath = process.env.DB_PATH || 'habit_diary.db';

const dialect = new SqliteDialect({
  database: new SQLite(dbPath),
});

export const db = new Kysely<Database>({ dialect });
