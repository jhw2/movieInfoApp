
import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { getDateObj, getMothLastWeekNo } from '../../utils/dayInfo';

const thisYear = new Date().getFullYear();
const WeeklySearchForm = memo(({currentMonth, currentWeek, searchList, weekGb})=>{
    const [weekSelect, setWeekSelect] = useState(); 
    const year = useRef();
    const week = useRef();
    const month = useRef();

    /**
     * 월 셀렉트박스 option 태그 생성
     */
    let createMonthOption = [];
    for(let m = 1; m < 13; m++){ createMonthOption.push(<option key={'month'+m} value={m}>{m}</option>);};
    
    /**
     * 주차 셀렉트박스 option 태그 생성
     * @param {*} countWeek :  현재 선택된 월의 주차 수
     * @returns 주차 option 태그
     */
    const createWeekSelect = useMemo(()=>(countWeek, defaultWeek)=>{
        let weekOption = [];
        for(let i = 1; i <= countWeek; i++){
            weekOption.push(<option key={'week'+i} value={i}>{i}</option>);
        }
        const weekSelect = <select name='week' ref={week} defaultValue={defaultWeek}>{weekOption}</select>;
        return weekSelect;
    },[])
    /**
     * 월이 변경되면 주차 셀렉스박스 변경
     * @param {*} event 
     */
    const changeWeekNo = useMemo(()=>({target})=>{
        let monthNum = month.current.value;
        monthNum = monthNum < 10 ? '0' + monthNum : monthNum; 

        let date = getDateObj(`${year.current.value}${monthNum}01`);
        let lastWeek = getMothLastWeekNo(date);
        week.current.value = '1';

        setWeekSelect(createWeekSelect(lastWeek, 1));
    },[createWeekSelect])
    /**
     * 라디오버튼 선택 이벤트
     */
    const handleChange = useMemo(()=>({target})=>{
        target.checked = 'checked';
    },[])

    useEffect(()=>{
        const defaultWeekOption = createWeekSelect(getMothLastWeekNo(), currentWeek);
        setWeekSelect(defaultWeekOption);
    },[currentWeek, createWeekSelect]);
    return (
        <div className='search-form week'>
            <form action="/" onSubmit={searchList}>
                <p>
                    <label className='lineSelect'>
                        <select name='year' ref={year}>
                            <option value={thisYear}>{thisYear}</option>
                        </select>
                        년
                    </label>
                    <label className='lineSelect'>
                        <select name='month' ref={month} defaultValue={currentMonth} onChange={changeWeekNo}>
                            {createMonthOption}
                        </select>
                        월
                    </label>
                    <label className='lineSelect'>
                        {weekSelect}
                        주차
                    </label>
                </p>
                <p>
                    <label><input type='radio' name='weekGb' value="0" onChange={handleChange} defaultChecked={true} />주간</label>
                    <label><input type='radio' name='weekGb' value="1" onChange={handleChange} />주말</label>
                    <label><input type='radio' name='weekGb' value="2" onChange={handleChange} />주중</label>
                </p>
                <input type="submit" value="검색" />
            </form>
        </div>
    );
})

export default WeeklySearchForm;
