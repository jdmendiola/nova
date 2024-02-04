"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutSession = exports.workouts = exports.exercises = exports.userSessions = exports.classes = exports.users = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    name: (0, sqlite_core_1.text)('full_name').notNull(),
    email: (0, sqlite_core_1.text)('email').notNull(),
});
exports.classes = (0, sqlite_core_1.sqliteTable)('classes', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    className: (0, sqlite_core_1.text)('class'),
    userId: (0, sqlite_core_1.integer)('user_id').references(() => exports.users.id),
});
exports.userSessions = (0, sqlite_core_1.sqliteTable)('user_sessions', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    userId: (0, sqlite_core_1.integer)('user_id').references(() => exports.users.id),
    location: (0, sqlite_core_1.text)('location').notNull(),
    status: (0, sqlite_core_1.text)('status').notNull(),
    createdAt: (0, sqlite_core_1.integer)('date', { mode: 'timestamp' }).notNull(),
});
exports.exercises = (0, sqlite_core_1.sqliteTable)('exercises', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    name: (0, sqlite_core_1.text)('name').notNull(),
});
exports.workouts = (0, sqlite_core_1.sqliteTable)('workouts', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    exerciseId: (0, sqlite_core_1.integer)('exercise_id').references(() => exports.exercises.id),
    reps: (0, sqlite_core_1.integer)('reps').notNull(),
    set: (0, sqlite_core_1.integer)('set').notNull(),
});
exports.workoutSession = (0, sqlite_core_1.sqliteTable)('workout_session', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    userSessionId: (0, sqlite_core_1.integer)('user_session_id').references(() => exports.userSessions.id),
    workoutsId: (0, sqlite_core_1.integer)('workouts_id').references(() => exports.workouts.id),
});
