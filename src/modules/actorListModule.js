import MoviService from '../http/MoviService';

export const CALL_ACTOR = 'CALL_ACTOR';
export const CALL_LOADING = 'CALL_LOADING';
export const ERROR = 'ERROR';

export const callLoading = (done)=>{
    return {type : CALL_LOADING, done}
}
export const callActorList = ({totCnt, actorList, status, curPage, itemPerPage, peopleNm})=>{
    return {type : CALL_ACTOR, totCnt, actorList, status, curPage, itemPerPage, peopleNm}
}
export const dataError = (error)=>{
    return {type: ERROR, error}
}

export const callActorListThunk = ({curPage, itemPerPage, peopleNm}) => async (dispatch, getState) => {
    dispatch(callLoading(false));
    await MoviService.getActorList({curPage, itemPerPage, peopleNm}).then(({data, status})=>{
        let actorList = data.peopleListResult.peopleList;
        const totCnt = data.peopleListResult.totCnt;
        dispatch(callActorList({totCnt, actorList, curPage, itemPerPage, peopleNm}));
    }).catch(error=>{dispatch(dataError(error))});
    
};


const initailState = {totCnt: 0, lastPageNum: 0, actorList: [], status: 200, curPage: '1', itemPerPage: '10', peopleNm: '', error: null, done: false};
export default function actorListReducer(state = initailState, action){
    switch(action.type){
        case CALL_ACTOR:
            let {totCnt, actorList, status, curPage, itemPerPage, peopleNm} = action;
            const lastPageNum = Math.ceil(Number(totCnt)/10);
            return {...state, totCnt, lastPageNum, actorList, status, curPage, itemPerPage, peopleNm, done: true}
        case CALL_LOADING:
            return {...state, done: action.done}
        case ERROR:
            return {...state, error: action.error, done: true}
        default:
            return state;
    }
}
