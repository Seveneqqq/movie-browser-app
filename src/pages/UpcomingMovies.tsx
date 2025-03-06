import { useEffect, useState } from 'react';
import getUpcomingMovies from '@/api/getUpcomingMovies';
import MovieList from '@/components/MovieList';
import { Skeleton } from '@/components/ui/skeleton';

const UpcomingMovies = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {

      const movieResults = await getUpcomingMovies();
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      
      const upcomingMovies = movieResults.filter((movie: any) => {
        if (!movie.release_date) return false;
        const releaseDate = new Date(movie.release_date);
        return releaseDate >= today;
      });
      
      setResults(upcomingMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className='text-2xl py-6 px-4 md:px-20'>
        <span className='font-bold'>Upcoming movies</span>
      </h1>
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

export default UpcomingMovies;