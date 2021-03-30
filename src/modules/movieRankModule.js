export const CALL_DAILYBOXOFFICE = 'CALL_DAILYBOXOFFICE';
export const CALL_LOADING = 'CALL_LOADING';

export const callDailyBoxoffice = ({data, status})=>{
    return {type : CALL_DAILYBOXOFFICE, dailyRankList: data, status}
}
export const callLoading = (done)=>{
    return {type : CALL_LOADING, done}
}
export const callDailyBoxofficeThunk = ({data, status}) => async (dispatch, getState) => {
    console.log(getState())
    await dispatch(callLoading(false));
    await dispatch(callDailyBoxoffice({data, status}));
};


const initailState = {date: '', dailyRankList: [], status: 200, done: false};
export default function movieRankReducer(state = initailState, action){
    switch(action.type){
        case CALL_DAILYBOXOFFICE:
            let {dailyRankList, status} = action;
            return {...state, dailyRankList, status, done: true}
        case CALL_LOADING:
            return {...state, done: action.done}
        default:
            return state;
    }
}
