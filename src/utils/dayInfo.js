const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate()-1));

//오늘날짜
export const getDayTxt = (date = yesterday) => {
    let year = date.getFullYear(); 
    let month = date.getMonth()+1; 
    let day = date.getDate(); 
    month = month < 10 ? '0'+month : month; 
    day = day < 10 ? '0'+day : day; 
    
    return `${year}${month}${day}`;
}
export const getDateObj = (dateTxt)=>{
    if(dateTxt.length !== 8){
        console.log('날짜형식 틀림(yyyymmdd)');
        return;
    }
    let year = dateTxt.substring(0,4);
    let month = dateTxt.substring(4,6);
    let day = dateTxt.substring(6,8);

    return new Date(`${year}-${month}-${day}`)
}

//현재시간
export const getCurrentTime = ()=>{
    let time = today.getHours()-1;
    time = time < 10 ? '0'+time : time; 

    return `${time}00`;
}

//주차 확인
export const getWeekNo = (date = yesterday)=>{
    let dateObj = date;
    if(typeof(date) === 'string'){
        dateObj = new Date(date);
    }

    const _year = dateObj.getFullYear();
    const _month = dateObj.getMonth()+1;
    const _date = dateObj.getDate();
    let _dayOfWeek = dateObj.getDay() - 1;
    if(_dayOfWeek === -1){_dayOfWeek = 6;}
    const week = parseInt((6 + _date - _dayOfWeek) / 7) + 1;
     
    return {year: _year, month: _month, week};
}

export const getMothLastWeekNo = (dateObj = yesterday)=>{
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth()+1;

    return getWeekNo(new Date(year, month, 0)).week;
}

export const getWeekFirstDate = (year, month, week)=>{
    let dayOfWeek = new Date(year, month, 1).getDay() - 1;
    if(dayOfWeek === -1){dayOfWeek = 6;}
    let day = Math.abs((7 * (week-1)) - (6 - dayOfWeek));
    month = month < 10 ? '0'+month : month; 
    day = day < 10 ? '0'+day : day; 
    return `${year}${month}${day}`;
}



