export const CREATE_PAGING_TAG = 'CREATE_PAGING_TAG';
export const SET_PAGE = 'SET_PAGE';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const setPage = (totCnt)=>{
    return {type : SET_PAGE, totCnt}
}

export const changePage = (curPage)=>{
    return {type : CHANGE_PAGE, curPage}
}

const initailState = {totCnt: 0, lastPageNum: 0, curPage: 1, itemPerPage: 10};
export default function pagingReducer(state = initailState, action){
    switch(action.type){
        case SET_PAGE:
            const {totCnt} = action;
            const lastPageNum = Number(Math.ceil(Number(totCnt)/10));
            return {...state, totCnt, lastPageNum}
        case CHANGE_PAGE:
            return {...state, curPage: Number(action.curPage)}
        default:
            return state;
    }
}
