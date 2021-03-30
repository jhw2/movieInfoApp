import './App.css';
import { Route } from 'react-router-dom';
import MoviService from './http/MoviService';
import { getToday } from './modules/dayInfo';
import DailyRank from './components/dailyRank';
import MovieDetail from './components/movieDetail';

const App = ()=>{

  return (
    <div>
      <Route exact path="/">
        <DailyRank MoviService={MoviService} date={getToday()}></DailyRank>
      </Route>
      <Route exact path="/movieDetail/:movieCd">
        <MovieDetail MoviService={MoviService}></MovieDetail>
      </Route>
    </div>
  );
}

export default App;
