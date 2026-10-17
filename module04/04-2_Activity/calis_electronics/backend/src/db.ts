import { Kysely, SqliteDialect, Generated, sql } from 'kysely';
import Database from 'better-sqlite3';
import path from 'path';

// Product type enum
export type ProductType = 'CPU' | 'GPU' | 'Motherboard' | 'Case' | 'PowerSupply' | 'RAM';

// Product specs interface (stored as JSON string in DB)
export interface ProductSpecs {
  brand?: string;
  model?: string;
  cores?: number;
  threads?: number;
  baseClock?: string;
  boostClock?: string;
  socket?: string;
  vram?: string;
  memoryType?: string;
  formFactor?: string;
  chipset?: string;
  memorySlots?: number;
  capacity?: string;
  speed?: string;
  size?: string;
  wattage?: number;
  efficiency?: string;
  [key: string]: string | number | undefined;
}

// Database table interface for Kysely
export interface ProductTable {
  id: Generated<number>;
  name: string;
  type: ProductType;
  price: number;
  description: string;
  specs: string; // JSON string
}

// Database schema
export interface DatabaseSchema {
  products: ProductTable;
}

// API response type (with parsed specs)
export interface Product {
  id: number;
  name: string;
  type: ProductType;
  price: number;
  description: string;
  specs: ProductSpecs;
}

// Create database instance
const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: new Database(path.join(__dirname, '../electronics.db')),
  }),
});

// Initialize database table
export async function initializeDatabase(): Promise<void> {
  // Create products table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      specs TEXT NOT NULL
    )
  `.execute(db);

  // Create indexes for filtering
  await sql`CREATE INDEX IF NOT EXISTS idx_products_type ON products(type)`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS idx_products_price ON products(price)`.execute(db);
}

export default db;
