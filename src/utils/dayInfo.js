const today = new Date();
const yesterday = new Date(today.setDate(today.getDate()-1));

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

