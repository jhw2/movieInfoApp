const today = new Date();
//오늘날짜
export const getToday = () => {
    let year = today.getFullYear(); 
    let month = today.getMonth()+1; 
    let day = today.getDate() -1; 
    month = month < 10 ? '0'+month : month; 
    day = day < 10 ? '0'+day : day; 
    
    return `${year}${month}${day}`;
}

//현재시간
export const getCurrentTime = ()=>{
    let time = today.getHours()-1;
    time = time < 10 ? '0'+time : time; 

    return `${time}00`;
}

