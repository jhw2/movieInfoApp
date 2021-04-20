
import { NavLink } from 'react-router-dom';
const Header = ({menuList})=>{
    return (
        <header className='mv-header'>
            <div className='group'>
            <div className="hd-logo"><a href="/">Movie<strong>Box</strong></a></div>
            <ul className="gnb">
                {menuList.map((menu, i)=>{
                    const {txt, url} = menu;
                    return <li key={url}><NavLink exact to={url} activeClassName='active'>{txt}</NavLink></li>
                })}
            </ul>
            </div>
        </header>
    );
}

export default Header;
