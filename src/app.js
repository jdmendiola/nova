import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
//import { users } from './db/schema.js';
//import { classes } from './db/schema.js';

const sqlite = new Database('../novatest.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: '../migrations' });
