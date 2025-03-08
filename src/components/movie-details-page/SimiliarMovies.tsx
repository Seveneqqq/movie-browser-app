import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface MovieData {
  id: number;
  title: string;
  poster_path: string | null;
}

type SimiliarMoviesProps = {
  movies: MovieData[];
};

const SimiliarMovies = ({ movies }: SimiliarMoviesProps) => {
  const navigate = useNavigate();
  
  // Filter out movies without poster images
  const moviesWithPosters = movies.filter(movie => movie.poster_path);

  return (
    <div className='mt-5 overflow-x-hidden md:px-20'>
      <h2 className="text-2xl font-bold mb-6 text-white">Similar movies</h2>
      
      {moviesWithPosters.length > 0 ? (
        <Carousel opts={{ align: "start" }} className="w-full max-w-full relative">
          <CarouselContent className='gap-1'>
            {moviesWithPosters.map((movie) => (
              <CarouselItem
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}/details`)}
                className="md:basis-1/5 basis-1/3 lg:basis-1/5"
              >
                <div className="relative group cursor-pointer">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full xl:h-[523px] h-full object-cover transition-transform transform group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <p>No similar movies with posters available.</p>
      )}
    </div>
  );
};

export default SimiliarMovies;