export const CALL_DAILYBOXOFFICE = 'CALL_DAILYBOXOFFICE';

export const callDailyBoxoffice = ({data, status})=>{
    return {type : CALL_DAILYBOXOFFICE, dailyRankList: data, status}
}
export const callDailyBoxofficeThunk = ({data, status}) => (dispatch, getState) => {
    console.log(getState())
    dispatch(callDailyBoxoffice({data, status}))
};


const initailState = {dailyRankList: [], status: 200};
export default function movieRankReducer(state = initailState, action){
    switch(action.type){
        case CALL_DAILYBOXOFFICE:
            let {dailyRankList, status} = action;
            return {...state, dailyRankList, status}
        default:
            return state;
    }
}
