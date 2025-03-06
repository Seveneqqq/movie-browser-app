import { useEffect, useState } from 'react';
import browseMovies from '@/api/browseMovies';
import MovieList from '@/components/MovieList';
import { Skeleton } from '@/components/ui/skeleton';

const Browse = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieResults = await browseMovies();
      setResults(movieResults);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className='text-2xl py-6 px-4 md:px-20'><span className='font-bold'> Browse movies </span></h1>
      {loading ? (
        <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-20'>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className='w-full aspect-[2/3] rounded-2xl' />
          ))}
        </div>
      ) : (
        <MovieList movies={results} filters={true} />
      )}
    </div>
  );
};

export default Browse;