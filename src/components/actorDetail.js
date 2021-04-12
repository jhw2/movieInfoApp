import { useParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { callactorDetailThunk } from '../modules/actorDetailInfoModul';

const ActorDetail = ()=>{
    const {peopleCd} = useParams();
    const dispatch = useDispatch();
    const {actorInfo} = useSelector(({actorDetailInfo})=>{return actorDetailInfo});
    let {peopleNm, filmos, repRoleNm, sex, homepages} = actorInfo;
    console.log(homepages)
    if(!filmos){filmos = []};

    const callActorInfo = useCallback(()=>{
        dispatch(callactorDetailThunk(peopleCd));
    },[dispatch, peopleCd]);

    useEffect(()=>{
        callActorInfo();
    },[callActorInfo])


    if(peopleCd){
        return(
            <div>
                <h4>{peopleNm}[{repRoleNm}]</h4>
                <p><a href={homepages} target='_blank'>{homepages}</a></p>
                <ul>
                    {
                        filmos.map((filmo, i)=>{
                            const {movieCd, movieNm, moviePartNm} = filmo;
                            return <li key={movieCd}>
                                        <Link to={'/movieDetail/'+movieCd}>{movieNm}[{moviePartNm}]</Link>
                                    </li>
                        })
                    }
                </ul>
                
                
            </div>
        );
    }else{
    return <div></div>
    }
}

export default ActorDetail;
