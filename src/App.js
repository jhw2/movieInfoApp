import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Lnb from './components/lnb';
import DailyRank from './components/dailyRank';
import WeeklyRank from './components/weeklyRank';
import MovieDetail from './components/movieDetail';

const App = ()=>{
  const menuList = [
    {txt: '일간박스오피스', url: '/dailyRank'},
    {txt: '주간박스오피스', url: '/weeklyRank'},
    {txt: '배우정보', url: '/actors'}
  ]

  return (
    <div id="wrap">
      <Header menuList={menuList}></Header>
      <section id="contents">
        <div className='group'>
          <Lnb menuList={menuList}></Lnb>
          <div className='cont'>
            <Route exact path="/dailyRank">
              <DailyRank></DailyRank>
            </Route>
            <Route exact path="/weeklyRank">
              <WeeklyRank></WeeklyRank>
            </Route>
            <Route exact path="/movieDetail/:movieCd/">
              <MovieDetail></MovieDetail>
            </Route>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export default App;
