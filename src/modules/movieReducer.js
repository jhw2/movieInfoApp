export const CALL_DAILYBOXOFFICE = 'CALL_DAILYBOXOFFICE';
export const CALL_MOVIEDETAIL = 'CALL_MOVIEDETAIL';

export const call_dailyBoxoffice = ({data, status})=>{
    return {type : CALL_DAILYBOXOFFICE, dailyRankList: data, status}
}

export const call_MovieDetal = (data)=>{
    return {type : CALL_MOVIEDETAIL, movieInfo: data}
}

const initailstate = {dailyRankList: [], movieInfo: {}, status: 200};
export const movieReducer = (state = initailstate, action)=>{
    switch(action.type){
        case CALL_DAILYBOXOFFICE:
            let {dailyRankList, status} = action;
            return {...state, dailyRankList, status}
        case CALL_MOVIEDETAIL:
            let {movieInfo} = action;
            return {...state, movieInfo}
        default:
            return state;
    }
}