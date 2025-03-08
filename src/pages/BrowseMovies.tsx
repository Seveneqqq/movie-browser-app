import { useEffect, useState } from 'react';
import browseMovies from '@/api/browseMovies';
import MovieList from '@/components/MovieList';
import { LoaderCircle } from 'lucide-react';

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
        <div className="fixed inset-0 flex justify-center items-center">
        <div className="animate-spin">
          <LoaderCircle size={128} />
        </div>
      </div>
      ) : (
        <MovieList movies={results} filters={true} />
      )}
    </div>
  );
};

export default Browse;