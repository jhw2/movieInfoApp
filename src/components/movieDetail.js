import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MoviService from '../http/MoviService';
import { call_MovieDetal } from '../modules/movieReducer';

const MovieDetail = ({dispatch, movieInfo})=>{
  const {movieCd} = useParams();
  useEffect(()=>{
    MoviService.getMovieDetailInfo(movieCd).then(({data})=>{
      let info = data.movieInfoResult.movieInfo;
      dispatch(call_MovieDetal(info));
    });
  },[])
  return(
    <div>
        <ul>
        
        
        </ul>
    </div>
  );
}

export default MovieDetail;
