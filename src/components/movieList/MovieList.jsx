
import { memo } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../images/no-data.jpg';

const MovieList = memo(({rankList})=>{
    return (
        <ul className='movie-list'>
            {
                rankList.map((val, i)=>{
                    let {rank, rankInten, rankOldAndNew, movieNm, openDt, audiAcc, movieCd, poster, scrnCnt, salesAmt} = val;
                    if(!poster || poster === 'no-data'){ 
                        poster = noImage;
                    }
                    const linkOption = {pathname: '/movieDetail/'+movieCd, state: {poster: poster, key: 'movieDetail'}};
                    let rankIntenClass = rankInten < 0 ? 'down' : 'up';
                    if(rankInten === '0'){rankIntenClass = 'new'}
                    return  <li key={movieCd}>
                                <div className='img-area'>
                                    <span className='rank'>{rank}</span>
                                    <Link to={linkOption}><img src={poster} alt={movieNm + '포스터'} /></Link>
                                </div>
                                <div className='info-area'>
                                    <p>
                                        <span className={'oldNew ' + rankOldAndNew}>{rankOldAndNew}</span>
                                        <strong className={rankIntenClass}>{Math.abs(rankInten)}</strong>
                                    </p>
                                    <h6><Link to={linkOption}>{movieNm}</Link></h6>
                                    <p><em>개봉일</em><span>{openDt}</span></p>
                                    <p><em>관객수</em><span>{audiAcc.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                                    <p><em>스크린수</em><span>{scrnCnt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                                    <p><em>메츨액</em><span>{salesAmt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                                </div>
                            </li>;
                })
            } 
            {/* 데이터 없는 경우 */}
            {rankList.length === 0 ? <li className="no-data">데이터가 없습니다.</li>:''}
        </ul>
    );
})

export default MovieList;
