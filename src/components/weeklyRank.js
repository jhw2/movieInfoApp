
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callWeeklyBoxofficeThunk } from '../modules/movieWeeklyRankModule';
import { getDateObj, getWeekNo, getMothLastWeekNo } from '../utils/dayInfo';
import Loading from './loading';

const WeeklyRank = ()=>{
  const dispatch = useDispatch();
  const {WeeklyRankList, month: currentMonth, week: currentWeek, weekGb, done} = useSelector(({movieWeeklyRankList})=>{return movieWeeklyRankList}, shallowEqual);
/**
 * 주차 셀렉트박스 option 태그 생성
 * @param {*} countWeek :  현재 선택된 월의 주차 수
 * @returns 주차 option 태그
 */
  const createWeekList = (countWeek)=>{
    let weekList = [];
    for(let i = 1; i <= countWeek; i++){
      weekList.push(<option key={i} value={i}>{i}</option>)
    }
    return weekList;
  }
  /**
   * 월이 변경되면 주차 셀렉스박스 변경
   * @param {*} event 
   */
  const changeWeekNo = ({target})=>{
    const year = target.parentNode.year.value;
    let month = target.value;
    month = month < 10 ? '0'+month : month; 

    let date = getDateObj(`${year}${month}01`);
    let lastWeek = getMothLastWeekNo(date);
    target.parentNode.week.value = '1';

    setWeekList(createWeekList(lastWeek));
  }

  let [weekList, setWeekList] = useState();


  const handleChange = ({target})=>{
    target.checked = 'checked';
  }

  /**
   * 주간 박스오피스 api call
   */
  const callList = useCallback(
    (date, repNationCd)=>{
      dispatch(callWeeklyBoxofficeThunk({...date, weekGb}));
    }
  , [dispatch, weekGb]);
  const searchList = (e)=>{
    e.preventDefault();
    let year = e.target.year.value;
    let month = e.target.month.value;
    let week = e.target.week.value;
    let weekGb = e.target.weekGb.value;
    callList({year, month, week, weekGb});
  }

  useEffect(()=>{
      callList(getWeekNo(), '0');
      const defaultWeekList = createWeekList(getMothLastWeekNo());
      setWeekList(defaultWeekList);

  },[callList]);

  return (
    <div>
        <Loading done={done}></Loading>

        <div className='group'>
          <div className='search-form'>
            <form action="/" onSubmit={searchList}>
              <label><input type='radio' name='weekGb' value="0" onChange={handleChange} defaultChecked={weekGb} />주간</label>
              <label><input type='radio' name='weekGb' value="1" onChange={handleChange} />주말</label>
              <label><input type='radio' name='weekGb' value="2" onChange={handleChange} />주중</label>
              <label>
                <select name='year'>
                    <option value='2021'>2021</option>
                </select>
                년
              </label>
              <select name='month' defaultValue={currentMonth} onChange={changeWeekNo}>
              {
                (()=>{
                  let options = [];
                  for(let m = 1; m < 13; m++){
                    options.push(<option key={m} value={m}>{m}</option>)
                  }
                  return options;
                })()
              }
              </select>

              <select name='week' defaultValue={currentWeek}>
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
            {WeeklyRankList.length === 0 ? <div className="no-data">데이터가 없습니다.</div>:''}
          </ul>
        </div>
    </div>
  );
}

export default WeeklyRank;
