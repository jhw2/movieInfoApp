
import './dailyRank.css';
import './movielist.css';
import { useEffect, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callDailyBoxofficeThunk } from '../../modules/movieRankModule';
import { getDayTxt, yesterday } from '../../utils/dayInfo';
import Loading from '../common';
import DailyRankSearchFrom from './DailyRankSearchFrom';
import Tab from './MovieTypeTab';
import MovieList from '../movieList';
 
const DailyRank = memo(()=>{
  
  
  const dispatch = useDispatch();
  const {dailyRankList, currentDate, repNationCd, done} = useSelector(({movieRankList})=>{return movieRankList}, shallowEqual);
  
  const callList = useCallback((date = yesterday, repNationCd = '')=>{
      dispatch(callDailyBoxofficeThunk({currentDateTxt: getDayTxt(date), currentDate: date, repNationCd}));
    }
  , [dispatch]);

  const tabEvt = useCallback((e)=>{
    e.preventDefault();
    const repNationCd = e.target.dataset.type;
    callList(currentDate, repNationCd);
  },[currentDate, callList]);
  
  useEffect(()=>{
      callList();
  },[callList]); 

  return (
    <div>
        <Loading done={done}></Loading>
        <Tab repNationCd={repNationCd} tabEvt={tabEvt}></Tab>
        <DailyRankSearchFrom currentDate={currentDate} callList={callList}></DailyRankSearchFrom>
        <MovieList rankList={dailyRankList}></MovieList>
    </div>
  );
})

export default DailyRank;
