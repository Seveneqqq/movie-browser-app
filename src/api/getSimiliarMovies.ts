const getSimiliarMovies = async (id: number) => {
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
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

      return data.results;

    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null; 
    }
  };
  
  export default getSimiliarMovies;
  