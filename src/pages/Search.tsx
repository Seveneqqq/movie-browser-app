import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchMovies from '@/api/searchMovies';
import MovieList from '@/components/MovieList';
import { Skeleton } from '@/components/ui/skeleton';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);

    const fetchMovies = async () => {
      if (searchQuery) {
        const movieResults = await searchMovies(searchQuery);
        setResults(movieResults);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [location.search]);

  return (
    <div>
      <h1 className='text-2xl py-6 px-4 md:px-20'><span className='font-bold'> Search Results </span> for: {query}</h1>
      {loading ? (
        <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-20'>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className='w-full aspect-[2/3] rounded-2xl' />
          ))}
        </div>
      ) : (
        <MovieList movies={results} />
      )}
    </div>
  );
};

export default Search;
