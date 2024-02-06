import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('full_name').notNull(),
  email: text('email').notNull(),
});

export const userSessions = sqliteTable('user_sessions', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  location: text('location').notNull(),
  status: text('status').notNull(),
  date: text('date').default(sql`CURRENT_TIMESTAMP`),
});

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});

export const workouts = sqliteTable('workouts', {
  id: integer('id').primaryKey(),
  exerciseId: integer('exercise_id').references(() => exercises.id),
  reps: integer('reps').notNull(),
  set: integer('set').notNull(),
  weight: integer('weight').notNull(),
});

export const workoutSession = sqliteTable('workout_session', {
  id: integer('id').primaryKey(),
  userSessionId: integer('user_session_id').references(() => userSessions.id),
  workoutsId: integer('workouts_id').references(() => workouts.id),
});
