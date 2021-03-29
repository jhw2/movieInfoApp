import './App.css';
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MoviService from './http/MoviService';
import { call_dailyBoxoffice } from './modules/movieReducer';
import { getToday } from './modules/dayInfo';
import DailyRank from './components/dailyRank';
import MovieDetail from './components/movieDetail';

const App = ()=>{
  let {dailyRankList, movieInfo} = useSelector((state)=>{return state});
  let dispatch = useDispatch();

  useEffect(()=>{
    MoviService.getDailyBoxoffice(getToday()).then(({data, status})=>{
      let dataList = data.boxOfficeResult.dailyBoxOfficeList;
      dispatch(call_dailyBoxoffice({data: dataList, status}));
    });
  },[]);
  return (
    <div>
      <Route exact path="/">
        <DailyRank dailyRankList={dailyRankList}></DailyRank>
      </Route>
      <Route exact path="/movieDetail/:movieCd">
        <MovieDetail dispatch={dispatch} movieInfo={movieInfo}></MovieDetail>
      </Route>
    </div>
  );
}

export default App;
