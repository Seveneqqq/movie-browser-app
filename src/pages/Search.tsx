import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
  }, [location.search]);

  return (
    <div>
      <h1>Search Results for: {query}</h1>
    </div>
  );
};

export default Search;
