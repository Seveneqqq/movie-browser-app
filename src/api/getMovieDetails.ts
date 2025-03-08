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
    backdrop_path: any;
    poster_path: any;
    id: number;
    release_date: string;
    runtime: number;
    genres: Array<{id: number, name: string}>;
    tagline: string;
    budget: number;
    revenue: number;
    cast: CastMember[];
  }
  
  const getMovieDetails = async (movieId: number): Promise<MovieData | null> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=en-US`,
        {
          method: 'GET',
          headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      
      if (!data) {
        return null;
      }
      
      const backdropUrl = data.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : null;
        
      const posterUrl = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : null;

      const cast = data.credits?.cast.map((actor : any) => ({
        id: actor.id,
        name: actor.name,
        original_name: actor.original_name,
        character: actor.character,
        profile_path: actor.profile_path 
          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
          : null,
        order: actor.order
      })) || [];

      const mainCast = cast.slice(0, 10);
      
      const movieData: MovieData = {
        title: data.title,
        vote_average: data.vote_average,
        overview: data.overview,
        backdrop_path: backdropUrl,
        poster_path: posterUrl,
        id: data.id,
        release_date: data.release_date,
        runtime: data.runtime,
        genres: data.genres || [],
        tagline: data.tagline || "",
        budget: data.budget,
        revenue: data.revenue,
        cast: mainCast,
      };
  
      return movieData;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  };
  
  export default getMovieDetails;