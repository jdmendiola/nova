"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const migrator_1 = require("drizzle-orm/better-sqlite3/migrator");
const better_sqlite3_2 = __importDefault(require("better-sqlite3"));
const schema_1 = require("./db/schema");
const schema_2 = require("./db/schema");
const schema_3 = require("./db/schema");
const schema_4 = require("./db/schema");
const schema_5 = require("./db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const sqlite = new better_sqlite3_2.default('./novatest.db');
const db = (0, better_sqlite3_1.drizzle)(sqlite);
(0, migrator_1.migrate)(db, { migrationsFolder: './migrations' });
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
    exercise: schema_5.exercises.name,
    location: schema_2.userSessions.location,
    reps: schema_4.workouts.reps,
    set: schema_4.workouts.set,
    name: schema_1.users.name,
})
    .from(schema_3.workoutSession)
    .leftJoin(schema_4.workouts, (0, drizzle_orm_1.eq)(schema_3.workoutSession.workoutsId, schema_4.workouts.id))
    .leftJoin(schema_5.exercises, (0, drizzle_orm_1.eq)(schema_4.workouts.exerciseId, schema_5.exercises.id))
    .leftJoin(schema_2.userSessions, (0, drizzle_orm_1.eq)(schema_3.workoutSession.userSessionId, schema_2.userSessions.id))
    .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_2.userSessions.userId, schema_1.users.id))
    .all();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(joinTest);
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
