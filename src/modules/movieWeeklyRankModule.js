import MoviService from '../http/MoviService';
import { getWeekFirstDate, getWeekNo } from '../utils/dayInfo';

export const CALL_WEEKLYBOXOFFICE = 'CALL_WEEKLYBOXOFFICE';
export const CALL_LOADING = 'CALL_LOADING';
export const ERROR = 'ERROR';

export const callLoading = (done)=>{
    return {type : CALL_LOADING, done}
}
export const callWeeklyBoxoffice = ({year, month, week, data, status, weekGb, showRange})=>{
    return {type : CALL_WEEKLYBOXOFFICE, WeeklyRankList: data, status, year, month, week, weekGb, showRange}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callWeeklyBoxofficeThunk = ({year, month, week, weekGb}) => async (dispatch, getState) => {
    dispatch(callLoading(false))
    let date = getWeekFirstDate(year, month, week);
    await MoviService.getWeeklyBoxOffice(date, weekGb).then(({data, status})=>{
        let dataList = data.boxOfficeResult.weeklyBoxOfficeList;
        let {showRange} = data.boxOfficeResult;
        dispatch(callWeeklyBoxoffice({year, month, week, data: dataList, status, weekGb, showRange}));
        
    }).catch(error=>{dispatch(dataError(error))});
    
};

const {year, month, week} = getWeekNo();
const initailState = {year, month, week, WeeklyRankList: [], status: 200, weekGb: '0', showRange: '', error: null, done: false};
export default function movieWeeklyRankReducer(state = initailState, action){
    switch(action.type){
        case CALL_WEEKLYBOXOFFICE:
            let {WeeklyRankList, status, year, month, week, weekGb, showRange} = action;
            return {...state, WeeklyRankList, status, year, month, week, weekGb, showRange, done: true}
        case CALL_LOADING:
            return {...state, done: action.done}
        case ERROR:
            return {...state, error: action.error, done: true}
        default:
            return state;
    }
}
