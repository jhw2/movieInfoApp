import MovieSearchService from '../http/movieSearchService';

export const getPoster = async(movieNm)=>{
    return new Promise((resolve,reject)=>{
        MovieSearchService.getSearchPoster(movieNm).then(({data})=>{
            resolve(data.items[0].image)
        });
    });
}