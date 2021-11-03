import MoviService from '../http/MoviService';
import { getWeekFirstDate, getWeekNo } from '../utils/dayInfo';
import {getPosterData} from '../utils/getMovieList';

export const CALL_WEEKLYBOXOFFICE = 'CALL_WEEKLYBOXOFFICE';
export const WEEKLY_CALL_LOADING = 'WEEKLY_CALL_LOADING';
export const ERROR = 'ERROR';

export const weeklyCallLoading = (done)=>{
    return {type : WEEKLY_CALL_LOADING, done}
}
export const callWeeklyBoxoffice = ({year, month, week, data, status, weekGb, showRange})=>{
    return {type : CALL_WEEKLYBOXOFFICE, WeeklyRankList: data, status, year, month, week, weekGb, showRange}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callWeeklyBoxofficeThunk = ({year, month, week, weekGb = '0'}) => (dispatch, getState) => {
    //기존과 동일한 데이터를 요청한 경우 api call 막음
    const prevData  = getState().movieWeeklyRankList;
    if( prevData.year === year && prevData.month === month && prevData.week === week 
        && prevData.weekGb === weekGb 
        && prevData.WeeklyRankList.length > 0){
        dispatch(weeklyCallLoading(true));
        return false;
    }
    dispatch(weeklyCallLoading(false))
    let date = getWeekFirstDate(year, month, week);
    MoviService.getWeeklyBoxOffice(date, weekGb).then( async ({data, status})=>{
        let dataList = data.boxOfficeResult.weeklyBoxOfficeList;
        let {showRange} = data.boxOfficeResult;
        const dataListHasPoster = await getPosterData(dataList);

        dispatch(callWeeklyBoxoffice({year, month, week, data: dataListHasPoster, status, weekGb, showRange}));
        
    }).catch(error=>{dispatch(dataError(error))});
    
};

const {year, month, week} = getWeekNo();
const initailState = {year, month, week, WeeklyRankList: [], status: 200, weekGb: '0', showRange: '', error: null, done: false};
export default function movieWeeklyRankReducer(state = initailState, action){
    switch(action.type){
        case CALL_WEEKLYBOXOFFICE:
            let {WeeklyRankList, status, year, month, week, weekGb, showRange} = action;
            return {...state, WeeklyRankList, status, year, month, week, weekGb, showRange, done: true}
        case WEEKLY_CALL_LOADING:
            return {...state, done: action.done}
        case ERROR:
            return {...state, error: action.error, done: true}
        default:
            return state;
    }
}
