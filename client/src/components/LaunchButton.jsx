import { Link } from 'react-router-dom';

export default function LaunchButton() {
  return (
    <>
      <Link to="/new">
        <button className="launchButton" role="button">
          Launch workout
        </button>
      </Link>
    </>
  );
}
