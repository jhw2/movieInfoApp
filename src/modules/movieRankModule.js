import MoviService from '../http/MoviService';
import {getPosterData} from '../utils/getMovieList';
import {getDayTxt} from '../utils/dayInfo';

export const CALL_DAILYBOXOFFICE = 'CALL_DAILYBOXOFFICE';
export const DAILY_CALL_LOADING = 'CALL_LOADING';
export const ERROR = 'ERROR';

export const dailycallLoading = (done)=>{
    return {type : DAILY_CALL_LOADING, done}
}
export const callDailyBoxoffice = ({currentDate, data, status, repNationCd})=>{
    return {type : CALL_DAILYBOXOFFICE, dailyRankList: data, status, currentDate, repNationCd}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callDailyBoxofficeThunk = ({currentDateTxt, currentDate, repNationCd = ''}) => (dispatch, getState) => {
    //기존과 동일한 데이터를 요청한 경우 api call 막음
    const prevData  = getState().movieRankList
    if( getDayTxt(new Date(prevData.currentDate)) === currentDateTxt 
        && prevData.repNationCd === repNationCd
        && prevData.dailyRankList.length > 0){
        return false;
    }

    dispatch(dailycallLoading(false))
    MoviService.getDailyBoxoffice(currentDateTxt, repNationCd).then( async ({data, status})=>{
        const dataList = data.boxOfficeResult.dailyBoxOfficeList;
        const dataListHasPoster = await getPosterData(dataList);
        
        dispatch(callDailyBoxoffice({currentDate, data: dataListHasPoster, status, repNationCd}));

    }).catch(error=>{dispatch(dataError(error))});

    
};


const initailState = {currentDate: null, dailyRankList: [], status: 200, repNationCd:'', error: null, done: false};
export default function movieRankReducer(state = initailState, action){
    switch(action.type){
        case CALL_DAILYBOXOFFICE:
            let {dailyRankList, status, currentDate, repNationCd} = action;
            return {...state, dailyRankList, status, currentDate, repNationCd, done: true}
        case DAILY_CALL_LOADING:
            return {...state, done: action.done}
        case ERROR:
            return {...state, error: action.error, done: true}
        default:
            return state;
    }
}
