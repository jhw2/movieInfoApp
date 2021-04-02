import MoviService from '../http/MoviService';

export const CALL_DAILYBOXOFFICE = 'CALL_DAILYBOXOFFICE';
export const CALL_LOADING = 'CALL_LOADING';
export const ERROR = 'ERROR';

export const callLoading = (done)=>{
    return {type : CALL_LOADING, done}
}
export const callDailyBoxoffice = ({currentDate, data, status, repNationCd})=>{
    return {type : CALL_DAILYBOXOFFICE, dailyRankList: data, status, currentDate, repNationCd}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callDailyBoxofficeThunk = ({currentDateTxt, currentDate, repNationCd}) => async (dispatch, getState) => {
    dispatch(callLoading(false))
    await MoviService.getDailyBoxoffice(currentDateTxt, repNationCd).then(({data, status})=>{
        let dataList = data.boxOfficeResult.dailyBoxOfficeList;
        dispatch(callDailyBoxoffice({currentDate, data: dataList, status, repNationCd}));
    }).catch(error=>{dispatch(dataError(error))});
    
};


const initailState = {currentDate: null, dailyRankList: [], status: 200, repNationCd:'', error: null, done: false};
export default function movieRankReducer(state = initailState, action){
    switch(action.type){
        case CALL_DAILYBOXOFFICE:
            let {dailyRankList, status, currentDate, repNationCd} = action;
            return {...state, dailyRankList, status, currentDate, repNationCd, done: true}
        case CALL_LOADING:
            return {...state, done: action.done}
        case ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
}
