import React from 'react';

interface MovieData {
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  id: number;
}

interface MovieListProps {
  movies: MovieData[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className='px-20'>
      <h2>Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Rating: {Math.round(movie.vote_average)}/10</p>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;