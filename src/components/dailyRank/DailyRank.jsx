
import { useEffect, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callDailyBoxofficeThunk } from '../../modules/movieRankModule';
import { getDayTxt, getDateObj } from '../../utils/dayInfo';
import Loading from '../common';
import DailyRankSearchFrom from './DailyRankSearchFrom';
import Tab from './MovieTypeTab';
import MovieList from '../movieList';
 
const DailyRank = memo(()=>{
  

  const dispatch = useDispatch();
  const {dailyRankList, currentDate, repNationCd, done} = useSelector(({movieRankList})=>{return movieRankList}, shallowEqual);

  const callList = useCallback((date = getDateObj(getDayTxt()), repNationCd = '')=>{
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
        <DailyRankSearchFrom currentDate={currentDate} callList={callList}></DailyRankSearchFrom>
        <Tab repNationCd={repNationCd} tabEvt={tabEvt}></Tab>
        <MovieList rankList={dailyRankList}></MovieList>
    </div>
  );
})

export default DailyRank;
