import './main.css';
import { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { getDayTxt, getDateObj } from '../../utils/dayInfo';
import { getWeekNo } from '../../utils/dayInfo';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { callDailyBoxofficeThunk } from '../../modules/movieRankModule';
import { callWeeklyBoxofficeThunk } from '../../modules/movieWeeklyRankModule';
import MainSlider from './MainSlider';
import MainSearch from './MainSearch';

const Main = memo(()=>{
    const dispatch = useDispatch();
    const { movieRankList, movieWeeklyRankList } = useSelector((movieData)=>{ return movieData;}, shallowEqual);
    const { dailyRankList, done: dailyDone } = movieRankList;
    const { WeeklyRankList, done: weeklyDone } = movieWeeklyRankList;

    useEffect(()=>{
        dispatch(callDailyBoxofficeThunk({currentDateTxt:  getDayTxt(), currentDate:getDateObj(getDayTxt())}));
    },[dispatch]);
    
    useEffect(()=>{
        dispatch(callWeeklyBoxofficeThunk(getWeekNo(), '0'));
    },[dispatch, dailyRankList]);

    return (
        <>
            <MainSearch />
            <MainSlider movieList={dailyRankList} title={<><em>일간</em> 박스오피스<Link to='/dailyRank' className='ic-more'>더보기</Link></>} done={dailyDone}></MainSlider>
            <MainSlider movieList={WeeklyRankList} title={<><em>주간</em> 박스오피스<Link to='/weeklyRank'className='ic-more'>더보기</Link></>} done={weeklyDone}></MainSlider>
        </>
    )
})

export default Main;