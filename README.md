# Nova

## Installation Steps

0. Sending DB via email it's a flat file

1. run `npm install` on the root directory

2. run `npm install` in the client directory

3. run `npm run dev` on the root directory this will run the back-end /src/app.ts file

4. Usually you would run react via its own server but started this in a rush and did not research enough so I'm just serving the final build folder from react to express.js. You'll need to run `npm run build` in the client folder. You should be running the backend from #3 and this step will load react

5. Access the page via the express home route `http://localhost:3000`

### About the Code

Database Model

- See my model in the root Assets folder diagram-export....
- /src/db/schema.ts is the model for the database object based of course

**Tables**

**exercises** - holds a list of hard coded exercises (bench press, dead lift etc...)

**user_sessions** - currently hard coded but this should come from the client

```javascript
  {
      id: 1,
      userId: 1, //hard coded to the user David Mendiola
      location: 'Fit Squad Toronto', //the gym or facility
      status: 'Amazing', //how the workout went or session went
  },
  {
    id: 2,
    userId: 1, //hard coded to some other use at the moment
    location: 'Fit Squad Toronto',
    status: 'Meh',
  },
```

**users** - self explanatory can see the /src/db/schema.ts for properties

**workout_session** - this is a look up table combining user_session and workouts essentially this is the data that the tiles are displaying on the home page again see `/src/db/schema.ts` to review all properties

**workouts** - every time a user fills out the form they fill a workout so the current work they are doing let's say bench press so it will ask what set your are, the weight, how many reps again see `/src/db/schema.ts` to review all properties

Development Stack

- Node.js and Express.js running the back-end routes
- SQLite database since it was a simple flat file
- Drizzle ORM to interface with the database and create models
- React created with Vite
- The whole project supports TS
- Deployed via DockerFile to fly.io server host

app.ts has all the back-end routes its messy :) You'll see some commented code at the top to populate the database

React Code

- Really messy in here but here's the hierarchy

1. main.jsx calls routes folder -> root.jsx and then you'll see `<Header> and <Columns>` columns has all the code dumped in there broken down into component the main bulk is in the components folder

### Possible Features

- I'm hard coding the user_session entries but this should ultimately come from the front-end. Each session is the tile on the home page, currently the app will add a new workout to user_session_id 2, need to figure out some interface that let's a user start a new session (new tile) and append their entered workouts to it. Maybe a button that says "Start New Session" and then starts a timer for 24 hours for that tile to be opened and let workouts be entered for it. Or with a Start New Session button and a End Session button which would close the session so any new workouts entered will not be accepted.

- If you add a workout again you'll see it will append to the second card / tile at the bottom

- Form validation in the launch workout page

- The tiles animation card don't work I was just playing around with some toggle and animations in react

- Maybe add authentication / login page of course

- Anything you think :)
