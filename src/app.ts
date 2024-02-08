import express from 'express';
import bodyParser from 'body-parser';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { SQLiteSyncDialect } from 'drizzle-orm/sqlite-core';
import Database from 'better-sqlite3';
import { users } from './db/schema';
import { userSessions } from './db/schema';
import { workoutSession } from './db/schema';
import { workouts } from './db/schema';
import { exercises } from './db/schema';
import { sql, eq, asc, desc } from 'drizzle-orm';
import minimist from 'minimist';
import path from 'path';

//const argv = minimist(process.argv.slice(2));
//console.log('ARG V PROCESS', argv);
//console.log(argv['sqlite-path']);
//const SQLITE_PATH = argv['sqlite-path'] ?? './novatest.db';
//console.log(process.env);
//const sqlite = new Database('/data/nova1.db');
const sqlite = new Database('./novatest.db');
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: './migrations' });

// /* sanitize tables */
// db.delete(users).run();
// db.delete(workouts).run();
// db.delete(exercises).run();
// db.delete(userSessions).run();
// db.delete(workoutSession).run();

// /* fill users */

// db.insert(users)
//   .values({
//     name: 'David Mendiola',
//     email: 'jdmmendiola@gmail.com',
//   })
//   .run();

// /* fill exercises */
// db.insert(exercises)
//   .values([
//     {
//       id: 1,
//       name: 'Bench Press',
//     },
//     {
//       id: 2,
//       name: 'Dead Lift',
//     },
//     {
//       id: 3,
//       name: 'Squats',
//     },
//     {
//       id: 4,
//       name: 'Front Squats',
//     },
//     {
//       id: 5,
//       name: 'Chest Flys',
//     },
//     {
//       id: 6,
//       name: 'Lat Pulldown',
//     },
//     {
//       id: 7,
//       name: 'Face Pulls',
//     },
//     {
//       id: 8,
//       name: 'Bicep Curls',
//     },
//     {
//       id: 9,
//       name: 'Tricep Extensions',
//     },
//     {
//       id: 10,
//       name: 'Leg Press',
//     },
//     {
//       id: 11,
//       name: 'Plank',
//     },
//     {
//       id: 12,
//       name: 'Hamstring Curls',
//     },
//   ])
//   .run();

// /* fill workouts */

// db.insert(workouts)
//   .values([
//     { id: 1, exerciseId: 1, reps: 12, set: 1, weight: 185 },
//     { id: 2, exerciseId: 1, reps: 10, set: 2, weight: 190 },
//     { id: 3, exerciseId: 1, reps: 8, set: 3, weight: 200 },
//     { id: 4, exerciseId: 2, reps: 12, set: 1, weight: 180 },
//     { id: 5, exerciseId: 2, reps: 10, set: 2, weight: 200 },
//     { id: 6, exerciseId: 2, reps: 8, set: 3, weight: 225 },
//     { id: 7, exerciseId: 9, reps: 15, set: 1, weight: 80 },
//     { id: 8, exerciseId: 9, reps: 12, set: 2, weight: 90 },
//     { id: 9, exerciseId: 9, reps: 6, set: 3, weight: 110 },
//     { id: 10, exerciseId: 8, reps: 15, set: 1, weight: 80 },
//     { id: 11, exerciseId: 7, reps: 12, set: 1, weight: 90 },
//     { id: 12, exerciseId: 5, reps: 6, set: 1, weight: 110 },
//   ])
//   .run();

// /* fill userSessions */
// db.insert(userSessions)
//   .values([
//     {
//       id: 1,
//       userId: 1,
//       location: 'Fit Squad Toronto',
//       status: 'Amazing',
//     },
//     {
//       id: 2,
//       userId: 1,
//       location: 'Fit Squad Toronto',
//       status: 'Meh',
//     },
//   ])
//   .run();

// /* workoutSession */
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
//     {
//       userSessionId: 1,
//       workoutsId: 3,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 4,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 5,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 6,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 7,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 8,
//     },
//     {
//       userSessionId: 1,
//       workoutsId: 9,
//     },
//     {
//       userSessionId: 2,
//       workoutsId: 10,
//     },
//     {
//       userSessionId: 2,
//       workoutsId: 11,
//     },
//     {
//       userSessionId: 2,
//       workoutsId: 12,
//     },
//   ])
//   .run();
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const allWorkouts = db
    .select({
      workOutSessionId: workoutSession.id,
      exercise: exercises.name,
      location: userSessions.location,
      reps: workouts.reps,
      set: workouts.set,
      weight: workouts.weight,
      name: users.name,
      data: userSessions.date,
      userSessionId: userSessions.id,
      workoutsId: workouts.id,
    })
    .from(workoutSession)
    .leftJoin(workouts, eq(workoutSession.workoutsId, workouts.id))
    .leftJoin(exercises, eq(workouts.exerciseId, exercises.id))
    .leftJoin(userSessions, eq(workoutSession.userSessionId, userSessions.id))
    .leftJoin(users, eq(userSessions.userId, users.id))
    .orderBy(desc(userSessions.id))
    .all();

  let unTypedArray: any[] = [...allWorkouts];

  const groupedBySessionId = unTypedArray.reduce((acc, workout) => {
    if (!acc[workout.userSessionId]) {
      acc[workout.userSessionId] = [];
    }

    acc[workout.userSessionId].push(workout);
    return acc;
  }, {});

  const groupedArrays = Object.values(groupedBySessionId);

  res.json(groupedArrays);
});

app.get('/api/exercises', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const allExercises = db.select().from(exercises).all();
  res.json(allExercises);
});

app.post('/api/submitExercise', (req, res) => {
  // Extract exercise, weight, reps, and sets from the request body
  const { exercise, weight, reps, sets } = req.body;

  // Here, you can add validation or processing logic for the received data
  console.log('Received exercise submission:', {
    exercise,
    weight,
    reps,
    sets,
  });

  // db.insert(workouts)
  //   .values({ exerciseId: exercise, reps: reps, set: sets, weight: weight })
  //   .run();

  const insertedWorkout = db
    .insert(workouts)
    .values({ exerciseId: exercise, reps: reps, set: sets, weight: weight })
    .returning({ workoutId: workouts.id })
    .all();

  console.log(insertedWorkout);

  db.insert(workoutSession)
    .values({
      userSessionId: 2,
      workoutsId: insertedWorkout[0].workoutId,
    })
    .run();

  res.status(200).json({ message: 'Exercise submitted successfully' });
  // TODO: ERRORS
});

app.delete('/delete/workout_session/:id', (req, res) => {
  const { id } = req.params;
  let workoutSessionId = db
    .select({ workoutSessionId: workoutSession.id })
    .from(workoutSession)
    .where(sql`${workoutSession.workoutsId} = ${id}`)
    .all();

  db.delete(workoutSession)
    .where(sql`${workoutSession.id} = ${workoutSessionId[0].workoutSessionId}`)
    .run();

  db.delete(workouts)
    .where(sql`${workouts.id} = ${id}`)
    .run();

  res.end();
});

// Serve React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
