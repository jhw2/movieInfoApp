
import { memo, useState } from 'react';

const ActorSearchForm = memo(({searchList, peopleInput})=>{
    const [name, setName] = useState();
    const onInputChange = e => {
        setName(peopleInput.current.value);
    };

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