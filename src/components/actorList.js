
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { Link  } from 'react-router-dom';
import { callActorListThunk } from '../modules/actorListModule';
import Loading from './loading';
import {getPoster} from '../utils/getMovieList';

const ActorList = ()=>{
    const dispatch = useDispatch();
    const {actorList, peopleNm, done} = useSelector(({actorList})=>{return actorList}, shallowEqual);
    const {curPage, lastPageNum} = useSelector(({paging})=>{return paging}, shallowEqual);
    /**
     * 배우 리스트 api call
     */
    const callList = useCallback(
        (curPage = 1, peopleNm = '')=>{
            dispatch(callActorListThunk({curPage, peopleNm}));
        }
        , [dispatch]
    );

    /** 
     * 영화인 이름 검색
     */
    let peopleInput = useRef();
    const [name, setName] = useState();
    const searchList = (e)=>{
        const peopleNm = peopleInput.current.value;
        callList(1, peopleNm);
        e.preventDefault();
    }
    const onInputChange = e => {
        setName(peopleInput.current.value);
    };

    useEffect(()=>{
        callList();
        getPoster('무서운이야기');
        
    },[callList]);
    

    /**
     * 페이징 이벤트
     */
    const createPageNumList = (page = curPage)=>{
        let pageList = [];
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        let end = lastPageNum < start + 10 ? lastPageNum + 1 : start + 10;
        for(let i = start; i < end; i++){
            pageList.push(<li key={i} className={page === i ? 'active':''}><a href='/' key={i} onClick={(e)=>{e.preventDefault();chPageEvt(i);}} >{i}</a></li>);
        }
        return pageList;
    }
    const chPageEvt = (curPage)=>{
        callList(curPage, peopleNm);
    }
    const chPrevPageEvt = (e)=>{
        e.preventDefault();
        let page = curPage - 10 <= 1 ? 1 : curPage - 10;
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        callList(start, peopleNm);
    }
    const chNextPageEvt = (e)=>{
        e.preventDefault();
        let page = curPage + 10 >= lastPageNum ? lastPageNum : curPage + 10;
        let start = (Math.ceil(page/10) - 1) * 10 + 1;
        callList(start, peopleNm);
    }
    let [pageList, setPageList] = useState();
    useEffect(()=>{
        setPageList(createPageNumList(curPage));
    },[curPage, lastPageNum]);
    

    return (
    <div>
        <Loading done={done}></Loading>

        <div className='search-form'>
            <form action='' onSubmit={searchList}>
                <input type='text' placeholder='영화인 이름을 입력해주세요.' name='peopleNm' value={name} ref={peopleInput} onChange={onInputChange} />
                <input type='submit' value='검색' />
            </form>
        </div>
        

        <ul className='actorList'>
            {
                actorList.map((actor, i)=>{
                    const {peopleCd, peopleNm, repRoleNm, filmoNames} = actor;
                    return  <li key={peopleCd}>
                                <div><Link to={'/actorDetail/'+peopleCd}>{peopleNm}[{repRoleNm}]</Link></div>
                                <p>{filmoNames}</p>
                            </li>
                })
            }
            
        </ul>

        <div className='pageNation'>
            <p className='firstPage' onClick={(e)=>{e.preventDefault();chPageEvt(1)}}><a href='/'>처음</a></p>
            <p className='prev' onClick={chPrevPageEvt}><a href='/'>이전</a></p>
            <ul>
                {pageList}
            </ul>
            <p className='next' onClick={chNextPageEvt}><a href='/'>다음</a></p>
            <p className='lastPage'><a href='/' onClick={(e)=>{e.preventDefault();chPageEvt(lastPageNum)}}>마지막</a></p>
        </div>
        
    </div>
    );
}

export default ActorList;
