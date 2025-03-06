import React, { useEffect, useState } from "react";
import getMainMovie from "@/api/getMainMovie";
import { Button } from "../ui/button";

interface MovieData {
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  id: number;
}

const MainMovie: React.FC = () => {

  const [movie, setMovie] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await getMainMovie();
      console.log(fetchedMovie); 
      setMovie(fetchedMovie); 
    };

    fetchMovie(); 
  }, [setMovie]); 

 
  if (!movie) {
    return <div>Loading...</div>; // TODO: dodać ładowanie i dodać wyświetlenie szczegolow filmow
  }

  return (
    <div className="relative w-full h-[88vh]">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="relative z-10 p-10 flex flex-col justify-between items-start h-full text-white max-w-[600px]">
        <div>
        </div>
            <div className="xl:ml-16">
                <h1 className="text-5xl font-bold">{movie.title}</h1>
                <p className="mt-4 text-lg leading-relaxed">{movie.overview}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl font-semibold">⭐ {Math.round(movie.vote_average)}/10</span>
                </div>
                <div className="flex flex-row gap-8">
                    <Button className="mt-6 w-36 px-6 py-3 bg-purple-600 hover:cursor-pointer hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-500">
                        Details
                    </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainMovie;
