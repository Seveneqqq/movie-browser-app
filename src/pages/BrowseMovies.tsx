import { useEffect, useState } from 'react';
import browseMovies from '@/api/browseMovies';
import MovieList from '@/components/MovieList';

const Browse = () => {

  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {

    const fetchMovies = async () => {
          const movieResults = await browseMovies();
          setResults(movieResults);
      };

    fetchMovies();

  }, []);

  return (
    <div>
      <h1 className='text-2xl py-6 px-4 md:px-20'><span className='font-bold'> Browse movies </span></h1>
      <MovieList movies={results} filters={true} />
    </div>
  );
};


export default Browse;
