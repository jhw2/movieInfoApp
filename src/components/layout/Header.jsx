import { memo } from 'react';
import { NavLink } from 'react-router-dom';
const Header = memo(({menuList})=>{
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
                    <span><NavLink exact to="/signup">회원가입</NavLink></span>
                    <span><NavLink exact to="/login">로그인</NavLink></span>
                </div>
            </div>
        </header>
    );
})

export default Header;
