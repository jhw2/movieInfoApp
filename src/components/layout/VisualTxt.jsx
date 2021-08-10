import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import menu from '../../menus';
const VisualTxt = memo(()=>{
    const location = useLocation();
    let currentPage = '', pageTitle ='', pageInfo = '';
    const {menuInfo} = menu;
    if(location.state){
      currentPage = location.state.key;
      pageTitle = menuInfo[currentPage].title;
      pageInfo = menuInfo[currentPage].cont;
    }
    if(!pageTitle){
        return <></>
    }else{
        return (
            <div className="visual-txt">
                <h5>{pageTitle}</h5>
                <div>{pageInfo}</div>
            </div>
        )
    }
   
})
export default VisualTxt;