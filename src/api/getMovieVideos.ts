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
  
  interface MovieVideosData {
    id: number;
    results: VideoResult[];
  }
  
  const getMovieVideos = async (movieId: number): Promise<MovieVideosData | null> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          method: 'GET',
          headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie videos');
      }
      
      const data = await response.json();
      
      if (!data) {
        return null;
      }
      
      const videosData: MovieVideosData = {
        id: data.id,
        results: data.results || [],
      };
      
      return videosData;
    } catch (error) {
      console.error('Error fetching movie videos:', error);
      return null;
    }
  };
  
  export default getMovieVideos;