import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = memo(({menuList})=>{
    const {loginSucces} = useSelector(({userInfo})=>{return userInfo});
    const userNic = loginSucces && loginSucces.data && loginSucces.data.userNic ? loginSucces.data.userNic : sessionStorage.getItem('userNic');
    const logoutMenu = [ <span key='signin'><NavLink exact to="/login">로그인</NavLink></span>, <span key='signup'><NavLink exact to="/signup">회원가입</NavLink></span>]
    const loginMenu = <span><a href="/api/v1/users/signout">{userNic}님 안녕하세요</a></span>

    return (
        <header className='mv-header'>
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
