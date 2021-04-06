
const Tab = ({repNationCd, tabEvt})=>{
    return (
        <ul className='mv-tab'>
            <li className={repNationCd === '' ? 'on':''} data-index='0'><a href="/" data-type='' onClick={tabEvt}>전체</a></li>
            <li className={repNationCd === 'K' ? 'on':''} data-index='1'><a href="/" data-type='K' onClick={tabEvt}>국내</a></li>
            <li className={repNationCd === 'F' ? 'on':''} data-index='2'><a href="/" data-type='F' onClick={tabEvt}>해외</a></li>
          </ul>
    );
}

export default Tab;
