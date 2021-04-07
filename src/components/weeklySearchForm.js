
import { useState, useEffect } from 'react';
import { getDateObj, getMothLastWeekNo } from '../utils/dayInfo';
const WeeklySearchForm = ({currentMonth, currentWeek, searchList, weekGb})=>{
    let [weekOption, setWeekOption] = useState(); 
    useEffect(()=>{
        const defaultWeekOption = createWeekOption(getMothLastWeekNo());
        setWeekOption(defaultWeekOption);
    },[]);

    /**
     * 월 셀렉트박스 option 태그 생성
     */
    let createMonthOption = [];
    for(let m = 1; m < 13; m++){ createMonthOption.push(<option key={m} value={m}>{m}</option>);};
    
    /**
     * 주차 셀렉트박스 option 태그 생성
     * @param {*} countWeek :  현재 선택된 월의 주차 수
     * @returns 주차 option 태그
     */
    const createWeekOption = (countWeek)=>{
        let weekOption = [];
        for(let i = 1; i <= countWeek; i++){
            weekOption.push(<option key={i} value={i}>{i}</option>);
        }
        return weekOption;
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

        setWeekOption(createWeekOption(lastWeek));
    }
    /**
     * 라디오버튼 선택 이벤트
     */
    const handleChange = ({target})=>{
        target.checked = 'checked';
    }
    return (
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
                <label>
                    <select name='month' defaultValue={currentMonth} onChange={changeWeekNo}>
                        {createMonthOption}
                    </select>
                    월
                </label>
                <label>
                    <select name='week' defaultValue={currentWeek}>
                        {weekOption}
                    </select>
                    주차
                </label>
                <input type="submit" value="검색" />
            </form>
        </div>
    );
}

export default WeeklySearchForm;
