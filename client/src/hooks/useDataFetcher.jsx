// useDataFetcher.js
import { useState, useEffect } from 'react';

const useDataFetcher = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setError(null); // Reset the error if the fetch is successful
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // Dependency array with URL ensures this effect runs when URL changes

  return { data, isLoading, error };
};

export default useDataFetcher;
