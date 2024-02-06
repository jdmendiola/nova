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
import { SQL, eq } from 'drizzle-orm';
import minimist from 'minimist';
import path from 'path';

//const argv = minimist(process.argv.slice(2));
//console.log('ARG V PROCESS', argv);
//console.log(argv['sqlite-path']);
//const SQLITE_PATH = argv['sqlite-path'] ?? './novatest.db';
console.log(process.env);
const sqlite = new Database('/data/nova.db');
//const sqlite = new Database('./novatest.db');
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: './migrations' });

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

/* sanitize tables */
db.delete(users).run();

/* fill users */

db.insert(users)
  .values({
    name: 'David Mendiola',
    email: 'jdmmendiola@gmail.com',
  })
  .run();

/* fill exercises */
db.insert(exercises)
  .values([
    {
      id: 1,
      name: 'Bench Press',
    },
    {
      id: 2,
      name: 'Dead Lift',
    },
    {
      id: 3,
      name: 'Squats',
    },
    {
      id: 4,
      name: 'Front Squats',
    },
    {
      id: 5,
      name: 'Chest Flys',
    },
    {
      id: 6,
      name: 'Lat Pulldown',
    },
    {
      id: 7,
      name: 'Face Pulls',
    },
    {
      id: 8,
      name: 'Bicep Curls',
    },
    {
      id: 9,
      name: 'Tricep Extensions',
    },
    {
      id: 10,
      name: 'Leg Press',
    },
    {
      id: 11,
      name: 'Plank',
    },
    {
      id: 12,
      name: 'Hamstring Curls',
    },
  ])
  .run();

/* fill workouts */

db.insert(workouts)
  .values([
    { id: 1, exerciseId: 1, reps: 12, set: 1, weight: 185 },
    { id: 1, exerciseId: 1, reps: 10, set: 2, weight: 190 },
    { id: 1, exerciseId: 1, reps: 8, set: 3, weight: 200 },
    { id: 1, exerciseId: 2, reps: 12, set: 1, weight: 180 },
    { id: 1, exerciseId: 2, reps: 10, set: 2, weight: 200 },
    { id: 1, exerciseId: 2, reps: 8, set: 3, weight: 225 },
    { id: 1, exerciseId: 9, reps: 15, set: 1, weight: 80 },
    { id: 1, exerciseId: 9, reps: 12, set: 2, weight: 90 },
    { id: 1, exerciseId: 9, reps: 6, set: 3, weight: 110 },
  ])
  .run();

/* fill userSessions */
db.insert(userSessions).values([
  {
    id: 1,
    userId: 1,
    location: 'Fit Squad Toronto',
    status: 'Amazing!',
    createdAt: 1707248362,
  },
]);

const joinTest = db.select().from(users).all();

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(joinTest);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
