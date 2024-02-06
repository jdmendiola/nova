import LaunchButton from './LaunchButton';
import useDataFetcher from '../hooks/useDataFetcher';

export default function Columns() {
  const { data, isLoading, error } = useDataFetcher('/api');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  data && console.log(data);
  return (
    <>
      <section className="container">
        <div id="columns">
          <div id="launch-column">
            <LaunchButton />
          </div>
          <div id="tile-column">
            <h2 id="tileHeader">Latest Workouts</h2>

            {data && (
              <ul>
                {data.map((item, index) => (
                  <>
                    <li key={index}>id: {item.id}</li>
                    <li key={index}>Name: {item.name}</li>
                    <li key={index}>Email: {item.email}</li>
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
