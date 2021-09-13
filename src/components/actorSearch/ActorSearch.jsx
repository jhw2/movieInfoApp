import './actorsearch.css';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import queryString from "query-string";
import { callActorListThunk } from '../../modules/actorListModule';
import Loading from '../common/Loading';
import ActorSearchForm from './ActorSearchForm';
import ActorList from './ActorList';
import PageNation from './PageNation';

const ActorSearch = ({ location })=>{
    const dispatch = useDispatch();
    const {actorList, peopleNm, done} = useSelector(({actorList})=>{return actorList}, shallowEqual);
    const {search: searchTxt} = queryString.parse(location.search);
    /**
     * 배우 리스트 api call
     */
    const callList = useCallback((curPage = 1, peopleName = peopleNm)=>{
            dispatch(callActorListThunk({curPage, peopleNm: peopleName}));
        }
        , [dispatch, peopleNm]
    );


    useEffect(()=>{
        dispatch(callActorListThunk({curPage: 1, peopleNm: searchTxt}));
    },[dispatch, searchTxt]);

    return (
    <div>
        <Loading done={done}></Loading>

        <ActorSearchForm callList={callList} searchTxt={searchTxt}></ActorSearchForm>
        <ActorList actorList={actorList}></ActorList>
        <PageNation callList={callList}></PageNation>
        
    </div>
    );
}

export default ActorSearch;
