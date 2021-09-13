import './moviedetail.css';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callMovieDetailThunk } from '../../modules/moviDetailInfoModule';
import noImage from '../../images/no-data.jpg';

const MovieDetail = ()=>{
  const {movieCd} = useParams();
  const {state} = useLocation();
  let poster = state && state.poster;
  if(!poster || poster === 'no-data'){ 
    poster = noImage;
  }
  const dispatch = useDispatch();
  const {movieInfo} = useSelector(({movieDetailInfo})=>{return movieDetailInfo});
  const {movieNm, movieNmEn, actors, audits, companys, directors, genres, openDt} = movieInfo;
  let watchGradeNm = '';
  if(audits && audits.length > 0){watchGradeNm = audits[0].watchGradeNm}

  const callMovieInfo = useCallback(()=>{
    dispatch(callMovieDetailThunk(movieCd));
  },[dispatch, movieCd]);
  
  useEffect(()=>{
    callMovieInfo();
  },[callMovieInfo])

  
  if(movieNm){
    return(
      <div className='movie-detail'>
          <div className='movie-poster'><img src={poster} alt={movieNm} /></div>
          <div className='movie-txt'>
            <h2>{movieNm}({movieNmEn})</h2>
            <p><em>등급</em> {watchGradeNm}</p>
            <p><em>개봉일</em> {openDt}</p>
            <p><em>장르</em>
              [
                {genres.map(({genreNm}, i)=>{
                  const type = genres.length-1 === i ?  genreNm : genreNm+'>';
                  return type;
                })}
              ]
            </p>
            <p><em>감독</em> {directors.map(({peopleNm}, i)=>{
                        const nm = directors.length-1 === i ?  peopleNm : peopleNm+',';
                        return nm;
                      })}
            </p>
            <ul>
              {
                companys.map(({companyPartNm, companyNm, companyCd}, i)=>{
                  return <li key={i}><em>{companyPartNm}</em> {companyNm}</li>
                })
              }
              
            </ul>
            <div>
              <p>출연배우</p>
              <div>
                {
                  actors.map(({peopleNm, cast}, i)=>{
                    const peopleNmCast = actors.length-1 === i ? <span key={peopleNm+cast}><em>{peopleNm}</em>({cast})</span> : <span><em>{peopleNm}</em>({cast}), </span>;
                    return peopleNmCast;
                  })
                }
              </div>
            </div>
          </div>
          
          
      </div>
    );
  }else{
    return <div></div>
  }
}

export default MovieDetail;
