
import { NavLink } from 'react-router-dom';
const Lnb = ({menuList})=>{
    return (
        <div className="mv-lnb">
            <h4>현재메뉴</h4>
            <ul>
                {menuList.map((menu, i)=>{
                    const {txt, url} = menu;
                    return <li><NavLink exact to={url} activeClassName='active'>{txt}</NavLink></li>
                })}
            </ul>
        </div>
    );
}

export default Lnb;
