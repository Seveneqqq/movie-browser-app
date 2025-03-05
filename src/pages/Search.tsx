import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchMovies from '@/api/searchMovies';
import MovieList from '@/components/MovieList';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);

    const fetchMovies = async () => {
      if (searchQuery) {
        const movieResults = await searchMovies(searchQuery);
        setResults(movieResults);
      }
    };

    fetchMovies();

  }, [location.search]);

  return (
    <div>
      <h1 className='text-2xl py-6 px-4 md:px-20'><span className='font-bold'> Search Results </span> for: {query}</h1>
      <MovieList movies={results} />
    </div>
  );
};

export default Search;
