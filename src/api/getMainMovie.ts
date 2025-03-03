
  interface MovieData {
    title: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    id: number;
  }
  
  const getMainMovie = async (): Promise<MovieData | null> => {
    console.log(import.meta.env.VITE_API_KEY);
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
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
  
        const randomIndex = Math.floor(Math.random() * data.results.length); 
        const movie = data.results[randomIndex]; 

  
        if (!movie) {
          return null; 
        }

      const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

      const movieData: MovieData = {
        title: movie.title,
        vote_average: movie.vote_average,
        overview: movie.overview,
        backdrop_path: backdropUrl,
        id: movie.id,
      };
  
      return movieData;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null; 
    }
  };
  
  export default getMainMovie;
  