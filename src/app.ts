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
import { sql, eq, asc, desc } from 'drizzle-orm';
import path from 'path';

//const sqlite = new Database('/data/nova1.db');
const sqlite = new Database('./novatest.db');
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: './migrations' });

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
  const { exercise, weight, reps, sets } = req.body;
  console.log('Received exercise submission:', {
    exercise,
    weight,
    reps,
    sets,
  });

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

app.listen(3000, () => console.log('node is running on port 3000'));
