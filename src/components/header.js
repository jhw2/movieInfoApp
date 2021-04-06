
import { NavLink } from 'react-router-dom';
const Header = ({location})=>{
    console.log("d",location)
    return (
        <header className='mv-header'>
            <div className='group'>
            <div className="hd-logo"><a href="/">영화정보 <strong>사이트</strong></a></div>
            <ul className="gnb">
                <li><NavLink exact to='/dailyRank' activeClassName='active'>일간박스오피스</NavLink></li>
                <li><NavLink exact to='/weeklyRank' activeClassName='active'>주간박스오피스</NavLink></li>
                <li><NavLink exact to='/actors' activeClassName='active'>배우정보</NavLink></li>
            </ul>
            </div>
        </header>
    );
}

export default Header;
