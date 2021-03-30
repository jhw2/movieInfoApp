export const CALL_MOVIEDETAIL = 'CALL_MOVIEDETAIL';

export const callMovieDetail = (data)=>{
    return {type : CALL_MOVIEDETAIL, movieInfo: data}
}
export const callMovieDetailThunk = (data) => (dispatch, getState) => {
    dispatch(callMovieDetail(data))
}

const initailState = {dailyRankList: [], movieInfo: {}, status: 200};
export default function movieDetailReducer(state = initailState, action){
    switch(action.type){
        case CALL_MOVIEDETAIL:
            let {movieInfo} = action;
            return {...state, movieInfo}
        default:
            return state;
    }
}
