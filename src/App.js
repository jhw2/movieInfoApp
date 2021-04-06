import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import DailyRank from './components/dailyRank';
import WeeklyRank from './components/weeklyRank';
import MovieDetail from './components/movieDetail';

const App = ({location})=>{
  console.log(location + 'ddd')
  return (
    <div id="wrap">
      <Header location={location}></Header>

      <section id="contents">
        <Route exact path="/dailyRank">
          <DailyRank></DailyRank>
        </Route>
        <Route exact path="/weeklyRank">
          <WeeklyRank></WeeklyRank>
        </Route>
        <Route exact path="/movieDetail/:movieCd/">
          <MovieDetail></MovieDetail>
        </Route>
      </section>

      <Footer></Footer>
    </div>
  );
}

export default App;
