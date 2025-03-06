const getUpcomingMovies = async (numberOfPages = 5) => {

    try {
        
      let allResults : any  = [];
      
      for (let page = 1; page <= numberOfPages; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data for page ${page}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.results) {
          continue; 
        }
        
        allResults = [...allResults, ...data.results];
        
        if (page >= data.total_pages) {
          break;
        }
      }
      
      return allResults;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  };
  
  export default getUpcomingMovies;