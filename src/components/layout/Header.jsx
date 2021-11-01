import { memo, useState, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import RightMenu from './RightMenu';

const Header = memo(({menuList})=>{
    const history = useHistory();
    const [mobileMenuOn, setMobileMenuOn] = useState(false);
    const menuClose = useCallback(()=>{
        setMobileMenuOn(false);
    }, [])
    const menuOpen = useCallback(()=>{
        setMobileMenuOn(true);
    }, [])

    const pagePrev = useCallback(()=>{
        history.goBack();
    }, [history])

    return (
        <header className={mobileMenuOn ? 'mv-header nav-open' : 'mv-header'}> 
            <div className='m-menu-bg' onClick={menuClose}></div>

            <div className='group'>
                <button className='ic-menu' onClick={menuOpen}>모바일메뉴</button>
                <button className='ic-prev' onClick={pagePrev}>뒤로가기</button>
                <div className="hd-logo"><a href="/">Movie<strong>Box</strong></a></div>
                <ul className="gnb">
                    {menuList.map((menu, i)=>{
                        const {key, txt, url, gnb} = menu;
                        if(gnb){
                            return <li key={url}><NavLink exact to={{pathname: url, state: {key: key}}} activeClassName='active' onClick={()=>{setMobileMenuOn(false);}}>{txt}</NavLink></li>
                        }else{
                            return false;
                        }
                    })}
                </ul>
                <RightMenu menuClose={menuClose}/>
               
            </div>
        </header>
    );
})

export default Header;
