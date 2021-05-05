import { memo } from 'react';
import { Link } from 'react-router-dom';
const ActorList = memo(({actorList})=>{
    return(
        <ul className='actorList'>
            {
                actorList.map((actor, i)=>{
                    const {peopleCd, peopleNm, repRoleNm, filmoNames} = actor;
                    return  <li key={peopleCd}>
                                <div><Link to={{pathname: '/actorDetail/'+peopleCd, state: {key: 'actorDetail'}}} >{peopleNm}[{repRoleNm}]</Link></div>
                                <p>{filmoNames}</p>
                            </li>
                })
            } 
        </ul>
    )
})
export default ActorList;