import { db } from './database.js';
import { sql } from 'kysely';

async function migrate() {
  await db.schema
    .createTable('journal_entries')
    .ifNotExists()
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('date', 'text', (col) => col.notNull())
    .addColumn('activity_type', 'text', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();

  console.log('Migration completed successfully');
  await db.destroy();
}

migrate().catch(console.error);
