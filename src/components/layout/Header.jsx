import { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import Loading from '../common';
import { logoutUser } from '../../modules/userInfoModule';

const Header = memo(({menuList})=>{
    const dispatch = useDispatch();
    const [isLodingDone, setIsLoadingDone] = useState(true);
    const logout = useCallback(()=>{
        setIsLoadingDone(false);

        dispatch(logoutUser()).then(respons=>{
            setIsLoadingDone(true);
            if(respons.payload.success){ 
                alert(respons.payload.msg)
                localStorage.removeItem('userId');
                localStorage.removeItem('userNic');
                localStorage.removeItem('token');
                window.location.reload();
            }else{
                alert('로그아웃 실패');
            }
        }).catch(error=>{
            setIsLoadingDone(true);
            console.log('로그아웃 실패', error);
        });
    }, [dispatch]);
    
    const {loginSucces} = useSelector(({userInfo})=>{return userInfo});
    const userNic = loginSucces && loginSucces.data && loginSucces.data.userNic ? loginSucces.data.userNic : localStorage.getItem('userNic');
    const logoutMenu = [ <span key='signin'><NavLink exact to="/login">로그인</NavLink></span>, <span key='signup'><NavLink exact to="/signup">회원가입</NavLink></span>]
    const loginMenu = <span><Link to='/changePw'>{userNic}님 안녕하세요</Link><button type='button' onClick={logout}>로그아웃</button></span>

    return (
        <header className='mv-header'>
            <Loading done={isLodingDone} />
            <div className='group'>
                <div className="hd-logo"><a href="/">Movie<strong>Box</strong></a></div>
                <ul className="gnb">
                    {menuList.map((menu, i)=>{
                        const {key, txt, url, gnb} = menu;
                        if(gnb){
                            return <li key={url}><NavLink exact to={{pathname: url, state: {key: key}}} activeClassName='active'>{txt}</NavLink></li>
                        }else{
                            return false;
                        }
                    })}
                </ul>
                <div className='right'>
                    { userNic ? loginMenu : logoutMenu }
                   
                </div>
            </div>
        </header>
    );
})

export default Header;
