
import "react-datepicker/dist/react-datepicker.css";
import './weeklyRank.css';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callWeeklyBoxofficeThunk } from '../../modules/movieWeeklyRankModule';
import { getWeekNo } from '../../utils/dayInfo';
import Loading from '../common/Loading';
import MovieList from '../movieList';
import WeeklySearchForm from './WeeklySearchForm';

const WeeklyRank = ()=>{
  const dispatch = useDispatch();
  const {WeeklyRankList, month: currentMonth, week: currentWeek, weekGb, showRange, done} = useSelector(({movieWeeklyRankList})=>{return movieWeeklyRankList}, shallowEqual);
  /**
   * 주간 박스오피스 api call
   */
  const callList = useCallback((date, weekGb)=>{
      dispatch(callWeeklyBoxofficeThunk({...date, weekGb}));
    }
  , [dispatch]);
  const searchList = useCallback((e)=>{
    e.preventDefault();
    let year = e.target.year.value;
    let month = e.target.month.value;
    let week = e.target.week.value;
    let weekGb = e.target.weekGb.value;
    callList({year, month, week}, weekGb);
  },[callList])

  useEffect(()=>{
      callList(getWeekNo(), '0');
  },[callList]);

  return (
    <div>
        <Loading done={done}></Loading>
        <div className='search-grp'>
          <WeeklySearchForm currentMonth={currentMonth} currentWeek={currentWeek} searchList={searchList} weekGb={weekGb}></WeeklySearchForm>
          <p className='period'>기간:{showRange}</p>
        </div>
        <MovieList rankList={WeeklyRankList}></MovieList>
    </div>
  );
}

export default WeeklyRank;
