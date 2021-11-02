import MovieSearchService from '../http/movieSearchService';
const moviePosters = localStorage.moviePosters ? JSON.parse(localStorage.moviePosters) : {};

export const getPosterData = async (dataList)=>{
    const dataListHasPoster = [...dataList];
    const promiseList = dataList.map( async (val, i)=>{
        const { movieNm } = val;
        const posterData = moviePosters[movieNm] ? moviePosters[movieNm] : MovieSearchService.getSearchPoster(movieNm)
        return posterData;
    });

    const posters = await Promise.allSettled(promiseList)
    posters.forEach(({value}, i)=>{
        let poster = 'no-data';
        
        //cache data
        if(typeof value === 'string'){
            poster = value;
        }
        //api call data
        if(typeof value === 'object'){
            const data = value.data;
            if(data.items.length !== 0){
                poster = data.items[0].image;
                const movieNm = data.items[0].title.replace(/(<([^>]+)>)/ig,"");
                moviePosters[movieNm] = poster;
            }
        }
        dataListHasPoster[i].poster = poster;
    });

    localStorage.moviePosters = JSON.stringify(moviePosters);

    return dataListHasPoster;
}