import { memo, useCallback, useState, useEffect } from 'react';
import { useSelector, shallowEqual  } from 'react-redux';

const PageNation = memo(({callList})=>{

    const {curPage, lastPageNum} = useSelector(({paging})=>{return paging}, shallowEqual);

    /**
     * 페이징 이벤트
     */
    const chPageEvt = useCallback((curPage)=>{
        callList(curPage);
    },[callList])
    const createPageNumList = useCallback((page = curPage)=>{
        let pageList = [];
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        let end = lastPageNum < start + 10 ? lastPageNum + 1 : start + 10;
        for(let i = start; i < end; i++){
            pageList.push(<li key={i} className={page === i ? 'active':''}><a href='/' key={i} onClick={(e)=>{e.preventDefault();chPageEvt(i);}} >{i}</a></li>);
        }
        return pageList;

    },[chPageEvt, curPage, lastPageNum]);
    const chPrevPageEvt = useCallback((e)=>{
        e.preventDefault();
        let page = curPage - 10 <= 1 ? 1 : curPage - 10;
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        callList(start);
    },[callList, curPage])
    const chNextPageEvt = useCallback((e)=>{
        e.preventDefault();
        let page = curPage + 10 >= lastPageNum ? lastPageNum : curPage + 10;
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        callList(start);
    },[callList, curPage, lastPageNum]);

    let [pageList, setPageList] = useState();
    useEffect(()=>{
        setPageList(createPageNumList(curPage));
    },[curPage, lastPageNum, createPageNumList]);

    return(
        <div className='pageNation'>
            <p className='firstPage' onClick={(e)=>{e.preventDefault();chPageEvt(1)}}><a href='/'>처음</a></p>
            <p className='prev' onClick={chPrevPageEvt}><a href='/'>이전</a></p>
            <ul>
                {pageList}
            </ul>
            <p className='next' onClick={chNextPageEvt}><a href='/'>다음</a></p>
            <p className='lastPage'><a href='/' onClick={(e)=>{e.preventDefault();chPageEvt(lastPageNum)}}>마지막</a></p>
        </div> 
    )

});

export default PageNation;