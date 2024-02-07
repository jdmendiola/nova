import Header from '../components/Header';
import ExerciseForm from '../components/WorkoutForm';

export default function New() {
  const headings = [
    'Great Job! You Crushed It!',
    'Workout Complete - Feel The Power!',
    'Congratulations! Set Achieved Successfully',
    'Strong Finish, Stronger Start!',
    'Victory! Your Effort Paid Off',
  ];

  const getRandomHeading = () => {
    const randomIndex = Math.floor(Math.random() * headings.length);
    return headings[randomIndex];
  };

  return (
    <>
      <Header />
      <div className="container">
        <div id="columns">
          <div id="launch-column">
            <span id="greeting">
              <p>Welcome David,</p>
              <p>Enter your workout progress</p>
              <p>
                First select a workout session, then enter workout weight, set,
                and reps.
              </p>
            </span>
          </div>
          <div id="tile-column-box">
            <h2 id="tileHeading">{getRandomHeading()}</h2>
            <ExerciseForm />
          </div>
        </div>
      </div>
    </>
  );
}
