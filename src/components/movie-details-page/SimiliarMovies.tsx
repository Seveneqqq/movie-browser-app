import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';


interface MovieData {
  id: number;
  title: string;
  poster_path: string;
}

type SimiliarMoviesProps = {
  movies: MovieData[];
};

const SimiliarMovies = ({ movies }: SimiliarMoviesProps) => {
  const navigate = useNavigate();

  return (
    <div className='mt-5 overflow-x-hidden md:px-20'>
      <h2 className="text-2xl font-bold mb-6 text-white">Similiar movies</h2>
      
      {movies.length > 0 ? (
        <Carousel opts={{ align: "start" }} className="w-full max-w-full relative">
          <CarouselContent className=' gap-1'>
            {movies.map((movie) => (
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
        <p>No similiar movies.</p>
      )}
    </div>
  );
};

export default SimiliarMovies;
