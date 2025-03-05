import { useState, useEffect } from 'react';
import GetCategoryList from "@/api/getCategoryList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CategoryListProps {
  categoryName: string;
}

interface MovieData {
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  id: number;
}

const CategoryList = ({ categoryName }: CategoryListProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [hoveredMovie, setHoveredMovie] = useState<any | null>(null);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const movieData = await GetCategoryList(categoryName);
      setMovies(movieData);
      setLoading(false);
    } catch (err) {
      setError('Nie udało się pobrać danych');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [categoryName]);

  return (
    <div className='mt-5 overflow-x-hidden'>
      <h2 className='text-2xl mb-5 md:px-25 px-10 flex items-center'>{categoryName}</h2>
      {loading && <p>Ładowanie...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && movies.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full relative"
        >
          <CarouselContent className='md:ml-20 ml-0 gap-1'>
            {movies.map((movie: MovieData) => (
              <CarouselItem key={movie.id} className="md:basis-1/5 basis-1/3 lg:basis-1/5">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredMovie(movie)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  <div className="overflow-hidden rounded-2xl shadow-md relative">
                  <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full xl:h-[523px] h-full object-cover transition-transform transform group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity opacity-0 group-hover:opacity-100"></div>

                    {hoveredMovie?.id === movie.id && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-semibold">{movie.title}</h3>
                        <p className="my-2 text-sm">{movie.overview}</p>
                        <div className="flex justify-between items-center w-full px-4">
                          <span className="text-yellow-500 text-sm">Rating: {movie.vote_average.toFixed(1)}/10</span>
                          <div className="space-x-2">
                            <button className="bg-purple-600 px-6 py-3 rounded-md text-white text-sm">Details</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
     
        </Carousel>
      ) : (
        <p>Brak filmów do wyświetlenia.</p>
      )}
    </div>
  );
};

export default CategoryList;
