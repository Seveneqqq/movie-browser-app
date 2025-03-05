
const categoryIds: { [key: string]: number } = {
    "Horror": 27,
    "Family": 10751,
    "Comedy": 35,
    "Thriller": 53,
    "Action": 28
};

const GetCategoryList = async (categoryName: string) => {

    const categoryId = categoryIds[categoryName];

    if (!categoryId) {
        console.error('Error: Invalid category');
        return;
    }

    const response  = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${categoryId}`, {
        method: 'GET',
        headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`, 
        },
    });

    const data = await response.json();
    
    return data.results; 
}

export default GetCategoryList;
