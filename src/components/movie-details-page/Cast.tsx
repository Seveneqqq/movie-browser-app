import React from 'react';

interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface CastProps {
  cast: CastMember[];
}

const Cast = ({ cast }: CastProps) => {

  const castWithImages = cast.filter(actor => actor.profile_path !== null);

  return (
    <div className="py-6 md:px-20">
      <h2 className="text-2xl font-bold mb-6 text-white">Cast</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {castWithImages.map((actor) => (
          <div 
            key={actor.id} 
            className="bg-[#1a1d1d] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-60 overflow-hidden">
              <img 
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                alt={`${actor.name}`}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-3 text-white">
              <h3 className="font-bold text-lg truncate">{actor.name}</h3>
              <p className="text-gray-400 text-sm truncate">as {actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;