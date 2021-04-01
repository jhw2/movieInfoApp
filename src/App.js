import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import DailyRank from './components/dailyRank';
import MovieDetail from './components/movieDetail';

const App = ()=>{

  return (
    <div id="wrap">
      <Header></Header>

      <section id="contents">
        <Route exact path="/">
          <DailyRank></DailyRank>
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
