import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import { ChevronsUpDown } from "lucide-react";

interface MovieData {
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  id: number;
  genre_ids: number[];
  release_date: string;
}

interface MovieListProps {
  movies: MovieData[];
  filters?: boolean;
}

const GENRE_MAP: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const MovieList: React.FC<MovieListProps> = ({ movies, filters = false }) => {
  const [hoveredMovie, setHoveredMovie] = useState<MovieData | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number[]>([0, 10]);
  const [resetKey, setResetKey] = useState<number>(0); 

  const uniqueYears = [...new Set(
    movies.map(movie => 
      movie.release_date ? new Date(movie.release_date).getFullYear().toString() : ''
    )
  )].filter(Boolean).sort().reverse();

  const uniqueGenres = [...new Set(
    movies.flatMap(movie => 
      movie.genre_ids.map(id => GENRE_MAP[id]).filter(Boolean)
    )
  )].sort();

  const filteredMovies = movies.filter(movie => {
    const posterFilter = movie.poster_path;
    const genreFilter = !selectedGenre || 
      movie.genre_ids.map(id => GENRE_MAP[id]).includes(selectedGenre);
    const yearFilter = !selectedYear || 
      (movie.release_date && 
       new Date(movie.release_date).getFullYear().toString() === selectedYear);
    const ratingMatches = movie.vote_average >= ratingFilter[0] && 
                          movie.vote_average <= ratingFilter[1];
  
    return posterFilter && genreFilter && yearFilter && ratingMatches;
  });

  const clearFilters = () => {
    setSelectedGenre(null);
    setSelectedYear(null);
    setRatingFilter([0, 10]);
    setResetKey(prevKey => prevKey + 1); 
  };

  return (
    <div className='px-4 md:px-20'>
      {filters && (
        <div className='flex flex-wrap gap-4 mb-6 items-center'>
          <Select key={`genre-${resetKey}`} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent className='bg-[#0B0D0D] text-[#e3eaeb] font-sans'>
              {uniqueGenres.map(genre => (
                <SelectItem key={genre} value={genre} className='hover:bg-gray-800'>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select key={`year-${resetKey}`} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className='bg-[#0B0D0D] text-[#e3eaeb] font-sans'>
              {uniqueYears.map(year => (
                <SelectItem key={year} value={year} className='hover:bg-gray-800'>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                Rating: {ratingFilter[0]} - {ratingFilter[1]}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] space-y-4 bg-[#0B0D0D] text-[#e3eaeb] font-sans">
              <div>
                <Slider
                  key={`rating-${resetKey}`}
                  defaultValue={[0, 10]}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={setRatingFilter}
                  className='bg-slate-800'
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>{ratingFilter[0]}</span>
                  <span>{ratingFilter[1]}</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" className="w-[180px]" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {filteredMovies.length === 0 ? (
        <p>No movies found matching the filters</p>
      ) : (
        <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {filteredMovies.map((movie: MovieData) => (
            <div key={movie.id} className="w-full aspect-[2/3]">
              <div
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg h-full"
                onMouseEnter={() => setHoveredMovie(movie)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <div className="w-full h-full">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
                  />
                </div>

                {hoveredMovie?.id === movie.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
                    <p className="text-sm mb-3 line-clamp-3">{movie.overview}</p>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-yellow-400 text-sm">
                        Rating: {movie.vote_average.toFixed(1)}/10
                      </span>
                      <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md text-white text-sm transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
