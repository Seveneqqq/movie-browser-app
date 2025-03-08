import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMovieDetails from '@/api/getMovieDetails';
import getMovieVideos from '@/api/getMovieVideos';
import getSimiliarMovies from '@/api/getSimiliarMovies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Cast from '@/components/movie-details-page/Cast';
import Videos from '@/components/movie-details-page/Videos';
import SimiliarMovies from '@/components/movie-details-page/SimiliarMovies';

interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface MovieData {
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  id: number;
  release_date: string;
  cast: CastMember[];
}

interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [similiarMovies, setSimiliarMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        if (id) {
          const movieData = await getMovieDetails(parseInt(id));
          setMovie(movieData);
          
          const videoData = await getMovieVideos(parseInt(id));
          setVideos(videoData?.results || []);
          
          const similiarData = await getSimiliarMovies(parseInt(id));
          setSimiliarMovies(similiarData || []);
        } else {
          throw new Error("Movie ID is missing");
        }
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error || "Movie not found"}</div>;
  }

  return (
    <>
      <div className="relative h-[91.5vh] bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(11,13,13,0.2) 50%, rgba(11,13,13,0.6) 65%, rgba(11,13,13,0.95) 85%, rgba(11,13,13,1) 100%), url(${movie.backdrop_path})` }}>
        <div className="relative z-10 p-10 flex flex-col justify-between items-start h-full text-white max-w-[800px] md:ml-16">
          <div onClick={() => navigate(-1)} className='rounded-full border-2 p-1 hover:border-gray-400 hover:text-gray-400 duration-500 hover:cursor-pointer'>
            <ArrowLeft size={48} />
          </div>
          <div className='flex flex-col gap-5'>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="mt-4 text-lg leading-relaxed">{movie.overview}</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-2xl font-semibold">⭐ {movie.vote_average.toFixed(1)}/10</span>
          </div>
          <Badge className="text-xl bg-slate-700" variant="secondary">{movie.release_date}</Badge>
          </div>
          
        </div>
      </div>

      <div className="bg-[#0B0D0D] flex justify-center w-full pt-2 pb-8">
        <Tabs defaultValue="details" className="w-full flex flex-col items-center">
          <TabsList className="flex justify-center gap-4 bg-[#1a1d1d] p-4 rounded-lg">
            <TabsTrigger className="text-xl" value="details">Details</TabsTrigger>
            <TabsTrigger className="text-xl" value="cast">Cast</TabsTrigger>
            <TabsTrigger className="text-xl" value="movies">Similar</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-4 text-white w-full">
            <Videos videos={videos} />
          </TabsContent>

          <TabsContent value="cast" className="p-4 text-white w-full">
            <Cast cast={movie.cast} />
          </TabsContent>

          <TabsContent value="movies" className="p-4 text-white w-full">
            <SimiliarMovies movies={similiarMovies} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MovieDetails;