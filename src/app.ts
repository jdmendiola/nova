import express from 'express';
import bodyParser from 'body-parser';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { users } from './db/schema';
import { userSessions } from './db/schema';
import { workoutSession } from './db/schema';
import { workouts } from './db/schema';
import { exercises } from './db/schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('../novatest.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: '../migrations' });

// db.insert(workoutSession)
//   .values([
//     {
//       userSessionId: 1,
//       workoutsId: 1,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 2,
//     },
//   ])
//   .run();

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
  .fast().run();

*/

const joinTest = db
  .select({
    exercise: exercises.name,
    location: userSessions.location,
    reps: workouts.reps,
    set: workouts.set,
    name: users.name,
  })
  .from(workoutSession)
  .leftJoin(workouts, eq(workoutSession.workoutsId, workouts.id))
  .leftJoin(exercises, eq(workouts.exerciseId, exercises.id))
  .leftJoin(userSessions, eq(workoutSession.userSessionId, userSessions.id))
  .leftJoin(users, eq(userSessions.userId, users.id))
  .all();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(joinTest);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
