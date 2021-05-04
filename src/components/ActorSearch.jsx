
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { callActorListThunk } from '../modules/actorListModule';
import Loading from './Loading';
import ActorSearchForm from './ActorSearchForm';
import ActorList from './ActorList';
import PageNation from './PageNation';

const ActorSearch = ()=>{
    const dispatch = useDispatch();
    const {actorList, peopleNm, done} = useSelector(({actorList})=>{return actorList}, shallowEqual);
    /**
     * 배우 리스트 api call
     */
    const callList = useCallback((curPage = 1, peopleName = peopleNm)=>{
            dispatch(callActorListThunk({curPage, peopleNm: peopleName}));
        }
        , [dispatch, peopleNm]
    );

    /** 
     * 영화인 이름 검색
     */
    let peopleInput = useRef();
    const searchList = (e)=>{
        const peopleNm = peopleInput.current.value;
        callList(1, peopleNm);
        e.preventDefault();
    }

    useEffect(()=>{
        callList();
    },[callList]);
    

    return (
    <div>
        <Loading done={done}></Loading>

        <ActorSearchForm searchList={searchList} peopleInput={peopleInput} ></ActorSearchForm>
        <ActorList actorList={actorList} ></ActorList>
        <PageNation callList={callList}></PageNation>
        
    </div>
    );
}

export default ActorSearch;
