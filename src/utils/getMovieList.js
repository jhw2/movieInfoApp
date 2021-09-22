import MovieSearchService from '../http/movieSearchService';

export const getPoster = (movieNm)=>{
    return new Promise((resolve,reject)=>{
        MovieSearchService.getSearchPoster(movieNm).then(({data})=>{
            let poster = 'no-data';
            if(data.items.length !== 0){
                poster = data.items[0].image;
            }
            resolve(poster)
        }).catch((data)=>{
            resolve('no-data')
        });
    });
}

export const posterPromiseList = (dataList)=>{
    return dataList.map( async (val, i)=>{
        const {movieNm} = val;
        return await getPoster(movieNm);
    })
}