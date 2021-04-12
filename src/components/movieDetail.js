import { useParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callMovieDetailThunk } from '../modules/moviDetailInfoModule';

const MovieDetail = ()=>{
  const {movieCd} = useParams();
  const dispatch = useDispatch();
  const {movieInfo} = useSelector(({movieDetailInfo})=>{return movieDetailInfo});
  const {movieNm, actors, audits, companys, directors, genres, openDt} = movieInfo;
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
      <div>
          
          <h2>{movieNm}</h2>
          <p>등급 : {watchGradeNm} 개봉일 : {openDt}</p>
          <p>
            [
              {genres.map(({genreNm}, i)=>{
                const type = genres.length-1 === i ?  genreNm : genreNm+'>';
                return type;
              })}
            ]
          </p>
          <p>감독 : {directors.map(({peopleNm}, i)=>{
                      const nm = directors.length-1 === i ?  peopleNm : peopleNm+',';
                      return nm;
                    })}
          </p>
          <ul>
            {
              companys.map(({companyPartNm, companyNm, companyCd}, i)=>{
                return <li key={i}>{companyPartNm} : {companyNm}</li>
              })
            }
            
          </ul>
          <div>
            <p>출연배우</p>
            <div>
              {
                actors.map(({peopleNm}, i)=>{
                  const people = actors.length-1 === i ?  peopleNm : peopleNm+', ';
                  return people
                })
              }
            </div>
          </div>
          
      </div>
    );
  }else{
    return <div></div>
  }
}

export default MovieDetail;
