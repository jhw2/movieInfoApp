import { memo, useCallback, useRef } from 'react';
import { useHistory } from "react-router-dom";

const MainSearch = memo(()=>{
    const searchTxt = useRef();
    const history = useHistory();
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        history.push({
            pathname: '/actors',
            search: '?search='+searchTxt.current.value
        });
    }, [history])
    return (
        <>
            <div className='mainSearch'>
                <div className='group'>
                    <form onSubmit={onSubmit}>
                        <input type='text' ref={searchTxt} placeholder='영화인정보를 검색해보세요.' />
                        <input type='submit' value='검색' />
                    </form>
                </div>
            </div>
        </>
    )
})

export default MainSearch;