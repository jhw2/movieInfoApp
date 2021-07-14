
import { memo } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../images/no-data.jpg';

const MovieList = memo(({rankList})=>{
    return (
        <ul className='movie-list'>
            {
                rankList.map((val, i)=>{
                    let {rank, rankInten, rankOldAndNew, movieNm, openDt, audiAcc, movieCd, poster} = val;
                    if(!poster || poster === 'no-data'){ 
                        poster = noImage;
                    }
                    return  <li key={movieCd}>
                                <img src={poster} alt={movieNm + '포스터'} />
                                <strong>{rankOldAndNew} {rankInten} {rank}</strong>
                                <h6><Link to={{pathname: '/movieDetail/'+movieCd, state: {poster: poster, key: 'movieDetail'}}}>{movieNm}</Link></h6>
                                <p><em>개봉</em><span>{openDt}</span></p>
                                <p><em>누적</em><span>{audiAcc}</span></p>
                            </li>;
                })
            } 
            {/* 데이터 없는 경우 */}
            {rankList.length === 0 ? <li className="no-data">데이터가 없습니다.</li>:''}
        </ul>
    );
})

export default MovieList;
