import MovieSearchService from '../http/movieSearchService';

export const getPoster = async(movieNm)=>{
    return new Promise((resolve,reject)=>{
        MovieSearchService.getSearchPoster(movieNm).then(({data})=>{
            let poster = 'no-data';
            if(data.items.length !== 0){
                poster = data.items[0].image;
            }
            resolve(poster)
        });
    });
}