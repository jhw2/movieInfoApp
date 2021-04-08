
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callActorListThunk } from '../modules/actorListModule';
import Loading from './loading';

const WeeklyRank = ()=>{
    const dispatch = useDispatch();
    const {totCnt, lastPageNum, actorList, curPage, itemPerPage, peopleNm, done} = useSelector(({actorList})=>{return actorList}, shallowEqual);
    /**
     * 배우 리스트 api call
     */
    const callList = useCallback(
    (curPage = '1', peopleNm = '김태성')=>{
        dispatch(callActorListThunk({curPage, peopleNm}));
    }
    , [dispatch]);
    const searchList = (e)=>{
        e.preventDefault();
        callList();
    }

    useEffect(()=>{
        callList();
    },[callList]);

    /**
     * 페이징 이벤트
     */
    const createPageNumList = (page = 1)=>{
        let pageList = [];
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        let end = lastPageNum < 10 ? lastPageNum + 1 : start + 10;
        console.log(lastPageNum)
        for(let i = start; i < end; i++){
            pageList.push(<li className={curPage === i ? 'active':''}><a href='/' key={i} onClick={(e)=>{e.preventDefault();chPageEvt(i);}} >{i}</a></li>);
        }
        return pageList;
    }
    
    let firstPageList = createPageNumList();
    let [pageList, setPageNumList] = useState(firstPageList);
    setPageNumList(firstPageList);

    const chPageEvt = (curPage)=>{
        callList(curPage);
        setPageNumList(createPageNumList(curPage));
    }
    const prevPageEvt = (e)=>{
        e.preventDefault();
        const prevPage = curPage === 1 ? '1' : curPage - 1;   
        chPageEvt(prevPage);
    }
    const nextPageEvt = (e)=>{
        e.preventDefault();
        const nextPage = curPage === lastPageNum ? lastPageNum : curPage + 1;   
        chPageEvt(nextPage);
    }
    return (
    <div>
        <Loading done={done}></Loading>

        <ul className='actorList'>
            {
                actorList.map((actor, i)=>{
                    const {peopleCd, peopleNm, repRoleNm, filmoNames} = actor;
                    return  <li>
                                <div>{peopleNm}[{repRoleNm}]</div>
                                <p>{filmoNames}</p>
                            </li>
                })
            }
            
        </ul>

        <div className='pageNation'>
            <p className='firstPage' onClick={chPageEvt}><a href='/'>처음</a></p>
            <p className='prev' onClick={prevPageEvt}><a href='/'>이전</a></p>
            <ul>
                {pageList}
            </ul>
            <p className='next' onClick={nextPageEvt}><a href='/'>다음</a></p>
            <p className='lastPage'><a href='/'>마지막</a></p>
        </div>
        
    </div>
    );
}

export default WeeklyRank;
