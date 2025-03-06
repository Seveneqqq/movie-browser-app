import React, { useEffect, useState } from "react";
import getMainMovie from "@/api/getMainMovie";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface MovieData {
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  id: number;
}

const MainMovie: React.FC = () => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await getMainMovie();
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Błąd pobierania filmu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div className="relative w-full h-[88vh]">
      {loading || !movie ? (
        <div className="absolute inset-0 flex flex-col justify-center items-start p-10 max-w-[600px]">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-2/3 mb-6" />
          <Skeleton className="h-8 w-36" />
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop_path})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="relative z-10 p-10 flex flex-col justify-end items-start h-full text-white max-w-[600px]">
            <div className="md:ml-16">
              <h1 className="text-5xl font-bold">{movie.title}</h1>
              <p className="mt-4 text-lg leading-relaxed">{movie.overview}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-yellow-400 text-2xl font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
              <div className="flex flex-row gap-8">
                <Button className="mt-6 w-36 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-500">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainMovie;
