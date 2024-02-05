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

const argv = minimist(process.argv.slice(2));
console.log('ARG V PROCESS', argv);
console.log(argv['sqlite-path']);
const SQLITE_PATH = argv['sqlite-path'] ?? './novatest.db';
const sqlite = new Database('/data/novatest.db');
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

db.insert(users)
  .values({ name: 'Justin Chu', email: 'blogger@blogger.com' })
  .run();

const joinTest = db.select().from(users).all();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(joinTest);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
