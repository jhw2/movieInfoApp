import MoviService from '../http/MoviService';

export const RESET = 'RESET';
export const CALL_ACTORDETAIL = 'CALL_ACTORDETAIL';
export const ERROR = 'ERROR';

export const dataReset = (data)=>{
    return {type : RESET}
}
export const callactorDetail = (data)=>{
    return {type : CALL_ACTORDETAIL, actorInfo: data}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callactorDetailThunk = (peopleCd) => (dispatch, getState) => {
    dispatch(dataReset());
    MoviService.getActorDetailInfo(peopleCd).then(({data})=>{
        let info = data.peopleInfoResult.peopleInfo;
        dispatch(callactorDetail(info))
    }).catch(error=>{dispatch(dataError(error))});
}

const initailState = {actorInfo: {}, status: 200, error: null, done: false};
export default function actorDetailReducer(state = initailState, action){
    switch(action.type){
        case RESET:
            return {...state, ...initailState};
        case CALL_ACTORDETAIL:
            let {actorInfo} = action;
            return {...state, actorInfo}
        case ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
}
