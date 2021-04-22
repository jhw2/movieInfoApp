const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate()-1));
const lastWeek = new Date(new Date().setDate(today.getDate()-6));

const getNewDay = (date)=>{
    let dayOfWeek = date.getDay() -1;
    if(dayOfWeek === -1){dayOfWeek = 6}
    return dayOfWeek;
}

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
    let month = dateTxt.substring(4,6) - 1;
    let day = dateTxt.substring(6,8);

    return new Date(year, month, day)
}

//주차 확인
export const getWeekNo = (date = lastWeek)=>{
    let dateObj = date;
    if(typeof(date) === 'string'){
        dateObj = new Date(date);
    }

    dateObj.setDate(dateObj.getDate()+(6 - getNewDay(dateObj)));

    let _year = dateObj.getFullYear();
    let _month = dateObj.getMonth()+1;
    let _date = dateObj.getDate();
   
    const week = parseInt((6 + _date - getNewDay(dateObj)) / 7) + 1;

    return {year: _year, month: _month, week};
}

export const getMothLastWeekNo = (dateObj = lastWeek)=>{
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let lastOfdate = new Date(year, month, 0);
    
    let _date = lastOfdate.getDate();
    let week = parseInt((6 + _date + getNewDay(lastOfdate) - 1) / 7);

    return getNewDay(lastOfdate) === 0 ? week : week-1;
}

export const getWeekFirstDate = (year, month, week)=>{
    let dayOfWeek = getNewDay(new Date(year, month-1, 1));
    let day = Math.abs((7 * week) - dayOfWeek - 6);
    month = month < 10 ? '0'+month : month; 
    day = day < 10 ? '0'+day : day; 
    return `${year}${month}${day}`;
}



