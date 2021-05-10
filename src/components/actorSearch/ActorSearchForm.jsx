
import { memo, useState, useRef } from 'react';

const ActorSearchForm = memo(({callList, searchTxt})=>{
    const [name, setName] = useState(searchTxt);
    const onInputChange = e => {
        setName(peopleInput.current.value);
    };

    /** 
    * 영화인 이름 검색
    */
    let peopleInput = useRef(searchTxt);
    const searchList = (e)=>{
        e.preventDefault();
        const peopleNm = peopleInput.current.value;
        callList(1, peopleNm);
    }

    return(
        <div className='search-form'>
            <form action='' onSubmit={searchList}>
                <input type='text' placeholder='영화인 이름을 입력해주세요.' name='peopleNm' value={name} ref={peopleInput} onChange={onInputChange} />
                <input type='submit' value='검색' />
            </form>
        </div>
    )
});

export default ActorSearchForm;