import { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import Loading from '../common';
import { logoutUser } from '../../modules/userInfoModule';

const RightMenu = memo(()=>{
    const dispatch = useDispatch();
    const [isLodingDone, setIsLoadingDone] = useState(true);
    const logout = useCallback(()=>{
        setIsLoadingDone(false);

        dispatch(logoutUser()).then(respons=>{
            setIsLoadingDone(true);
            if(respons.payload.success){ 
                alert(respons.payload.msg)
                localStorage.removeItem('userNo');
                localStorage.removeItem('token');
            }else{
                alert('로그아웃 실패');
            }
        }).catch(error=>{
            setIsLoadingDone(true);
            console.log('로그아웃 실패', error);
        });
    }, [dispatch]);
    
    const {loginSucces, userAuthInfo} = useSelector(({userInfo})=>{return userInfo});
    const userNic = loginSucces && loginSucces.data ? loginSucces.data.userNic : userAuthInfo &&  userAuthInfo.data && userAuthInfo.data.userNic;
    console.log('ttttttttt',userNic);
    const logoutMenu = [ <span key='signin'><NavLink exact to="/login">로그인</NavLink></span>, <span key='signup'><NavLink exact to="/signup">회원가입</NavLink></span>]
    const loginMenu = <span><Link to='/userProfile'>{userNic}님 안녕하세요</Link><button type='button' onClick={logout}>로그아웃</button></span>

    return (
        <>
            <Loading done={isLodingDone} />
            <div className='right'>
            {userNic ? loginMenu : logoutMenu}
        </div>
        </>
    )
})

export default RightMenu;