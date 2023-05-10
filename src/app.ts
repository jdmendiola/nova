import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { users } from './db/schema';
import { classes } from './db/schema';
import { userSessions } from './db/schema';
import { workoutSession } from './db/schema';
import { workouts } from './db/schema';
import { exercises } from './db/schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('../novatest.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: '../migrations' });

db.insert(workouts)
  .values([
    {
      exerciseId: 1,
      reps: 10,
      set: 1,
    },
    {
      exerciseId: 1,
      reps: 8,
      set: 2,
    },
    {
      exerciseId: 1,
      reps: 5,
      set: 3,
    },
  ])
  .run();

/*

db.insert(classes)
  .values([
    {
      userId: 2,
      className: 'Math',
    },
    {
      userId: 1,
      className: 'English',
    },
  ])
  .run();
*/

// const joinTest = db
//   .select({
//     id: classes.id,
//     class: classes.className,
//     user: users.name,
//   })
//   .from(classes)
//   .innerJoin(users, eq(classes.userId, users.id))
//   .all();

// console.log('------------------------', joinTest);

console.log(new Date());
