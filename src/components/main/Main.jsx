import { useEffect, memo, useCallback, useRef } from 'react';
import { getDayTxt, getDateObj } from '../../utils/dayInfo';
import { getWeekNo } from '../../utils/dayInfo';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { callDailyBoxofficeThunk } from '../../modules/movieRankModule';
import { callWeeklyBoxofficeThunk } from '../../modules/movieWeeklyRankModule';
import MainSlider from './MainSlider';

import { useHistory } from "react-router-dom";

const Main = memo(()=>{
    const dispatch = useDispatch();
    const { movieRankList, movieWeeklyRankList } = useSelector((movieData)=>{ return movieData;}, shallowEqual);
    const { dailyRankList, done: dailyDone } = movieRankList;
    const { WeeklyRankList, showRange, done: weeklyDone } = movieWeeklyRankList;

    useEffect(()=>{
        dispatch(callDailyBoxofficeThunk({currentDateTxt:  getDayTxt(), currentDate:getDateObj(getDayTxt())}));
    },[dispatch]);
    
    useEffect(()=>{
        if(dailyRankList.length > 0){
            dispatch(callWeeklyBoxofficeThunk(getWeekNo(), '0'));
        }
    },[dispatch, dailyRankList]);

    const searchTxt = useRef();
    const history = useHistory();
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        history.push({
            pathname: '/actors',
            search: '?search='+searchTxt.current.value
        });
    }, [history])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type='text' ref={searchTxt} placeholder='영화인정보를 검색해보세요.' />
                <input type='submit' value='검색' />
            </form>
            <MainSlider movieList={dailyRankList} title={'일간박스오피스('+getDayTxt()+')'} done={dailyDone}></MainSlider>
            <MainSlider movieList={WeeklyRankList} title={'주간박스오피스('+showRange+')'} done={weeklyDone}></MainSlider>
            
        </>
    )
})

export default Main;