import MoviService from '../http/MoviService';

export const RESET = 'RESET';
export const CALL_MOVIEDETAIL = 'CALL_MOVIEDETAIL';
export const ERROR = 'ERROR';

export const dataReset = (data)=>{
    return {type : RESET}
}
export const callMovieDetail = (data)=>{
    return {type : CALL_MOVIEDETAIL, movieInfo: data}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callMovieDetailThunk = (movieCd) => async (dispatch, getState) => {
    await dispatch(dataReset());
    await MoviService.getMovieDetailInfo(movieCd).then(({data})=>{
        let info = data.movieInfoResult.movieInfo;
        dispatch(callMovieDetail(info))
    }).catch(error=>{dispatch(dataError(error))});
}

const initailState = {movieInfo: {}, status: 200, error: null, done: false};
export default function movieDetailReducer(state = initailState, action){
    switch(action.type){
        case RESET:
            return {...state, ...initailState};
        case CALL_MOVIEDETAIL:
            let {movieInfo} = action;
            return {...state, movieInfo}
        case ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
}
