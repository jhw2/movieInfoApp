
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callDailyBoxofficeThunk } from '../modules/movieRankModule';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { getDayTxt, getDateObj } from '../utils/dayInfo';
import Loading from './loading';
import Tab from './movieTypeTab';
import MovieList from './movieList';

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
        <MovieList rankList={dailyRankList}></MovieList>
    </div>
  );
}

export default DailyRank;
