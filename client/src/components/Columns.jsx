import LaunchButton from './LaunchButton';
import useDataFetcher from '../hooks/useDataFetcher';

export default function Columns() {
  const { data, isLoading, error } = useDataFetcher('/api');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="container">
        <div id="columns">
          <div id="launch-column">
            <span id="greeting">
              <p className="greeting-name">Welcome David,</p>
            </span>
            <LaunchButton />
          </div>
          <div id="tile-column">
            {data &&
              Object.keys(data).map((sessionId, index) => (
                <div
                  id="tile-column-box"
                  className="tile-column-scroll"
                  key={sessionId}
                >
                  {index == 0 ? (
                    <h2 id="tileHeader">Latest Workouts</h2>
                  ) : (
                    <div className="spacer"></div>
                  )}
                  <div id="tile-header-title">
                    <div>
                      <span>Gym</span>
                      <span>{data[sessionId][0].location}</span>
                    </div>
                    <div>
                      <span>Date</span>
                      <span>{data[sessionId][0].data}</span>
                    </div>
                  </div>
                  <div id="tile-table">
                    <div id="tile-table-title">
                      <span className="title-row">Exercise</span>
                      <span className="title-row">Reps</span>
                      <span className="title-row">Set</span>
                      <span className="title-row">Weight</span>
                    </div>
                    {data[sessionId].map((session, index) => (
                      <div
                        className="tile-table-row"
                        key={session.workoutsId}
                        data-workout-id={session.workoutsId}
                      >
                        <span className="row">{session.exercise}</span>
                        <span className="row">{session.reps}</span>
                        <span className="row">{session.set}</span>
                        <span className="row">{session.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
