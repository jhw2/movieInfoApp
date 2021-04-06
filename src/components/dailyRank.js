
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callDailyBoxofficeThunk } from '../modules/movieRankModule';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { getDayTxt, getDateObj } from '../utils/dayInfo';
import Loading from './loading';
import Tab from './movieTypeTab';

const DailyRank = ()=>{

  const dispatch = useDispatch();
  const {dailyRankList, currentDate, repNationCd, done} = useSelector(({movieRankList})=>{return movieRankList}, shallowEqual);
  let defaultDate = currentDate ? currentDate : getDateObj(getDayTxt());

  const tabEvt = (e)=>{
    e.preventDefault();
    const repNationCd = e.target.dataset.type;
    callList(currentDate, repNationCd);
  }
  
  const callList = useCallback(
    (date = defaultDate, repNationCd = '')=>{
      dispatch(callDailyBoxofficeThunk({currentDateTxt: getDayTxt(date), currentDate: date, repNationCd}));
    }
  , [dispatch, defaultDate]);
  
  useEffect(()=>{
    callList();
  },[callList]); 

  return (
    <div>
        <Loading done={done}></Loading>

        <div className='group'>
          <div className='search-form'>
            <DatePicker
              locale={ko}
              selected={currentDate}
              onChange={(date) => callList(date)}
              dateFormat = "yyyy-MM-dd"
              shouldCloseOnSelect={true}
              name='start'
            />
          </div>

          <Tab repNationCd={repNationCd} tabEvt={tabEvt}></Tab>
          

          <ul className='movie-list'>
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
            {/* 데이터 없는 경우 */}
          {dailyRankList.length === 0 ? <div className="no-data">데이터가 없습니다.</div>:''}
          </ul>
        </div>
    </div>
  );
}

export default DailyRank;
