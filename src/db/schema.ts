import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('full_name').notNull(),
  email: text('email').notNull(),
});

export const classes = sqliteTable('classes', {
  id: integer('id').primaryKey(),
  className: text('class'),
  userId: integer('user_id').references(() => users.id),
});
