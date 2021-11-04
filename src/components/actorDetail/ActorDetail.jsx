import './actordetail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { callactorDetailThunk } from '../../modules/actorDetailInfoModul';
import { getPosterData } from '../../utils/getMovieList'

const ActorDetail = ()=>{
    const {peopleCd} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {actorInfo} = useSelector(({actorDetailInfo})=>{return actorDetailInfo});
    let {peopleNm, filmos, repRoleNm, sex, homepages} = actorInfo;
    if(!filmos){filmos = []};

    const callActorInfo = useCallback(()=>{
        dispatch(callactorDetailThunk(peopleCd));
    },[dispatch, peopleCd]);

    useEffect(()=>{
        callActorInfo();
    },[callActorInfo])

    const goToMovieDetail = useCallback( async (e, url, movieNm)=>{
        e.preventDefault();
        const movieData =  await getPosterData([{movieNm}]);
        history.push({pathname: url, state: {poster: movieData[0].poster, key: 'movieDetail'}});
    },[history]);
   

    if(peopleCd){
        return(
            <div className='actorDetail'>
                <h5>{peopleNm}[{sex}][{repRoleNm}]</h5>
                <p><a href={homepages} target='_blank' rel="noreferrer">{homepages}</a></p>
                <div className='fillmo'>
                    <p>필모그래피</p>
                    <ul>
                        {
                            filmos.map((filmo, i)=>{
                                const {movieCd, movieNm, moviePartNm} = filmo;
                                return <li key={movieCd}>
                                            <a href='/' onClick={(e)=>{goToMovieDetail(e,'/movieDetail/'+movieCd, movieNm)}}>{movieNm}</a>[{moviePartNm}]
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }else{
    return <div></div>
    }
}

export default ActorDetail;
