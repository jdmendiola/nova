import LaunchButton from './LaunchButton';

export default function Columns() {
  return (
    <>
      <section className="container">
        <div id="columns">
          <div id="launch-column">
            <LaunchButton />
          </div>
          <div id="tile-column">
            <h2 id="tileHeader">Latest Workouts</h2>
          </div>
        </div>
      </section>
    </>
  );
}
