
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callWeeklyBoxofficeThunk } from '../modules/movieWeeklyRankModule';
import { getDateObj, getWeekNo, getMothLastWeekNo } from '../utils/dayInfo';
import Loading from './loading';

const WeeklyRank = ()=>{

  const {WeeklyRankList, month: currentMonth, week: currentWeek, weekGb, done} = useSelector(({movieWeeklyRankList})=>{return movieWeeklyRankList}, shallowEqual);
  const dispatch = useDispatch();

  const createWeekList = (lastWeek, selectedWeek)=>{
    let weekList = [];
    
    for(let i = 1; i <= lastWeek; i++){
      let selected =  Number(selectedWeek) === i ? 'selected':'';
      weekList.push(<option value={i} selected={selected}>{i}</option>)
    }
    return weekList;
  }
  
  const defaultWeekList = createWeekList(getMothLastWeekNo(), currentWeek);
  let [weekList, setWeekList] = useState(defaultWeekList);


  const changeWeekNo = ({target})=>{
    const year = target.parentNode.year.value;
    let month = target.value;
    month = month < 10 ? '0'+month : month; 

    let date = getDateObj(`${year}${month}01`);
    let lastWeek = getMothLastWeekNo(date);

    setWeekList(createWeekList(lastWeek, '1'))
  }
  
  const callList = useCallback(
    (date, repNationCd)=>{
      dispatch(callWeeklyBoxofficeThunk({...date, weekGb}));
    }
  , [dispatch]);

  const searchList = (e)=>{
    e.preventDefault();
    let year = e.target.year.value;
    let month = e.target.month.value;
    let week = e.target.week.value;
    let weekGb = e.target.weekGb.value;

    callList({year, month, week, weekGb});
  }


  useEffect(()=>{
    if(WeeklyRankList.length === 0){
      callList(getWeekNo(), '0');
    }
    
  },[WeeklyRankList, callList]);

  return (
    <div>
        <Loading done={done}></Loading>

        <div className='group'>
          <div className='search-form'>
            <form action="/" onSubmit={searchList}>
              <label><input type='radio' name='weekGb' value="0" checked={ weekGb === '0' ? 'true':''} />주간</label>
              <label><input type='radio' name='weekGb' value="1" checked={ weekGb === '1' ? 'true':''} />주말</label>
              <label><input type='radio' name='weekGb' value="2" checked={ weekGb === '2' ? 'true':''} />주중</label>

              <label>
                <select name='year'>
                    <option value='2021'>2021</option>
                </select>
                년
              </label>
              <select name='month' onChange={changeWeekNo}>
              {
                (()=>{
                  let options = [];
                  for(let m = 1; m < 13; m++){
                    options.push(<option val={m} selected={ Number(currentMonth) === m ? 'selected':'' }>{m}</option>)
                  }
                  return options;
                })()
              }
              </select>

              <select name='week'>
                {weekList}
              </select>
              <input type="submit" value="검색" />
            </form>
          </div>

          <ul className='movie-list'>
            {
                WeeklyRankList.map((val, i)=>{
                    const {rank, rankInten, rankOldAndNew, movieNm, openDt, audiAcc, movieCd} = val;
                    return  <li key={i}>
                                <strong>{rankOldAndNew} {rankInten} {rank}</strong>
                                <h6><Link to={'/movieDetail/'+movieCd}>{movieNm}</Link></h6>
                                <p><em>개봉</em><span>{openDt}</span></p>
                                <p><em>누적</em><span>{audiAcc}</span></p>
                            </li>;
                })
            }
          
            {/* 데이터 없는 경우 */}
            {WeeklyRankList.length === 0 ? <div class="no-data">데이터가 없습니다.</div>:''}
          </ul>
        </div>
    </div>
  );
}

export default WeeklyRank;
