
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callDailyBoxofficeThunk } from '../modules/movieRankModule';

const DailyRank = ({MoviService, date})=>{

  const {dailyRankList} = useSelector(({movieRankReducer})=>{return movieRankReducer});
  const dispatch = useDispatch();
 
  useEffect(()=>{
    MoviService.getDailyBoxoffice(date).then(({data, status})=>{
      let dataList = data.boxOfficeResult.dailyBoxOfficeList;
      dispatch(callDailyBoxofficeThunk({data: dataList, status}));
    });
  },[]);

  return (
    <div>
        <ul>
        {
            dailyRankList.map((val, i)=>{
                const {rank, rankInten, rankOldAndNew, movieNm, openDt, audiAcc, movieCd} = val;
                return  <li key={i}>
                            <strong>{rankOldAndNew} {rankInten} {rank}</strong>
                            <h6><Link to={'/movieDetail/'+movieCd}>{movieNm}</Link></h6>
                            <p><em>개봉</em><span>{openDt}</span></p>
                            <p><em>누적</em><span>{audiAcc}</span></p>
                        </li>;
            })
        }
        
        </ul>
    </div>
  );
}

export default DailyRank;
