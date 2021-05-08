import { useEffect, memo, useCallback } from 'react';
import { getDayTxt, getDateObj } from '../../utils/dayInfo';
import { getWeekNo } from '../../utils/dayInfo';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { callDailyBoxofficeThunk } from '../../modules/movieRankModule';
import { callWeeklyBoxofficeThunk } from '../../modules/movieWeeklyRankModule';
import MainSlider from './MainSlider';

const Main = memo(()=>{
    const dispatch = useDispatch();
    const dispatch2 = useDispatch();
    const { movieRankList, movieWeeklyRankList } = useSelector((movieData)=>{ return movieData;}, shallowEqual);
    const { dailyRankList, done: dailyDone } = movieRankList;
    const { WeeklyRankList, showRange, done: weeklyDone } = movieWeeklyRankList;

    console.log(dailyDone, WeeklyRankList)

    const callDailyRank = useCallback(()=>{
        dispatch(callDailyBoxofficeThunk({currentDateTxt:  getDayTxt(), currentDate:getDateObj(getDayTxt())}));
    },[dispatch])

    const callWeeklyRank = useCallback(()=>{
        if(dailyRankList.length > 0){
            dispatch2(callWeeklyBoxofficeThunk(getWeekNo(), '0'));
        }
    },[dispatch2, dailyRankList])


    useEffect(()=>{
        callDailyRank();
    },[callDailyRank]);
    
    useEffect(()=>{
        callWeeklyRank();
    },[callWeeklyRank]);


    return (
        <>
            <MainSlider movieList={dailyRankList} title={'일간박스오피스('+getDayTxt()+')'} done={dailyDone}></MainSlider>

            <MainSlider movieList={WeeklyRankList} title={'주간박스오피스('+showRange+')'} done={weeklyDone}></MainSlider>
            
        </>
    )
})

export default Main;