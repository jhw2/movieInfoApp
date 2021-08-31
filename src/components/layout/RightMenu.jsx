import { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import Loading from '../common';
import { logoutUser } from '../../modules/userInfoModule';

const RightMenu = memo(({menuClose})=>{
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
                menuClose();
            }else{
                alert('로그아웃 실패');
            }
        }).catch(error=>{
            setIsLoadingDone(true);
            console.log('로그아웃 실패', error);
        });
    }, [dispatch, menuClose]);
    
    const {loginSucces, userAuthInfo} = useSelector(({userInfo})=>{return userInfo});
    const userNic = loginSucces && loginSucces.data ? loginSucces.data.userNic : userAuthInfo &&  userAuthInfo.data && userAuthInfo.data.userNic;
    const logoutMenu = [ <span key='signin'><NavLink exact to="/login" onClick={menuClose}>로그인</NavLink></span>, <span key='signup'><NavLink exact to="/signup" onClick={menuClose}>회원가입</NavLink></span>]
    const loginMenu = <span><Link to='/userProfile' onClick={menuClose}>{userNic}</Link> 님<button type='button' className='logout' onClick={logout}>로그아웃</button></span>
    return (
        <>
            <Loading done={isLodingDone} />
            <div className='right'>
            {userNic ? loginMenu : logoutMenu}
            <button className='ic-mobile-close' type='button' onClick={menuClose}>닫기</button>
        </div>
        </>
    )
})

export default RightMenu;