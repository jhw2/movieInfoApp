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

export const callWeeklyBoxofficeThunk = ({year, month, week, weekGb}) => (dispatch, getState) => {
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
