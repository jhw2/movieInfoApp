import MovieSearchService from '../http/movieSearchService';

export const getPosterData = async (dataList)=>{
    const dataListHasPoster = [...dataList];
    const promiseList = dataList.map( async (val, i)=>{
        const { movieNm } = val;
        return MovieSearchService.getSearchPoster(movieNm);
    });

    const posters = await Promise.all(promiseList)
    posters.forEach(({ data }, i)=>{
        let poster = 'no-data';
        if(data.items.length !== 0){
            poster = data.items[0].image;
        }
        dataListHasPoster[i].poster = poster;
    });

    return dataListHasPoster;
}