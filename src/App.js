import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import DailyRank from './components/dailyRank';
import WeeklyRank from './components/weeklyRank';
import MovieDetail from './components/movieDetail';
import ActorList from './components/actorList';
import ActorDetail from './components/actorDetail';

const App = ()=>{
  const menuList = [
    {txt: '일간박스오피스', url: '/dailyRank'},
    {txt: '주간박스오피스', url: '/weeklyRank'},
    {txt: '영화인정보', url: '/actors'}
  ]

  return (
    <div id="wrap">
      <Header menuList={menuList}></Header>

      <div className="visual-txt">
        비주얼 텍스트
      </div>

      <section id="contents">
        <div className='group'>
          <div className='cont'>
            <Switch>
              <Route exact path="/dailyRank" component={DailyRank} />
              <Route exact path="/weeklyRank" component={WeeklyRank} />
              <Route exact path="/movieDetail/:movieCd/" component={MovieDetail} />
              <Route exact path="/actors" component={ActorList} />
              <Route exact path="/actorDetail/:peopleCd/" component={ActorDetail} />
            </Switch>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export default App;
