import MoviService from '../http/MoviService';
import {getPoster} from '../utils/getMovieList';

export const CALL_DAILYBOXOFFICE = 'CALL_DAILYBOXOFFICE';
export const CALL_LOADING = 'CALL_LOADING';
export const ERROR = 'ERROR';

export const callLoading = (done)=>{
    return {type : CALL_LOADING, done}
}
export const callDailyBoxoffice = ({currentDate, data, status, repNationCd})=>{
    console.log("최종s",data);
    return {type : CALL_DAILYBOXOFFICE, dailyRankList: data, status, currentDate, repNationCd}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callDailyBoxofficeThunk = ({currentDateTxt, currentDate, repNationCd}) => (dispatch, getState) => {
    dispatch(callLoading(false))
    MoviService.getDailyBoxoffice(currentDateTxt, repNationCd).then( async ({data, status})=>{
        let dataList = data.boxOfficeResult.dailyBoxOfficeList;
        let posters = await Promise.all(
            dataList.map( async (val, i)=>{
                const {movieNm} = val;
                //dataList[i].poster = await getPoster(movieNm);
                return await getPoster(movieNm);
            })
        );
        posters.forEach((poster, i)=>{
            dataList[i].poster = poster;
        })
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
            return {...state, error: action.error, done: true}
        default:
            return state;
    }
}
