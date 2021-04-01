
import { Link } from 'react-router-dom';
const Header = ()=>{
    return (
        <header className='mv-header'>
            <div className='group'>
            <div className="hd-logo"><a href="/">영화정보 <strong>사이트</strong></a></div>
            <ul className="gnb">
                <li className="active"><Link to=''>일간박스오피스</Link></li>
                <li><Link to=''>주간박스오피스</Link></li>
                <li><Link to=''>배우정보</Link></li>
            </ul>
            </div>
        </header>
    );
}

export default Header;
