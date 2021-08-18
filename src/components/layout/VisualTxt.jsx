import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import menu from '../../menus';
import mainSlider01 from '../../images/main-slider01.jpg';
import mainSlider02 from '../../images/main-slider02.jpg';
// import mainSlider03 from '../../images/main-slider03.jpg';

const settings = {
    autoplay : true,
    arrows: false,
	autoplaySpeed : 5000, 
    infinite: true,
};
const VisualTxt = memo(()=>{
    const location = useLocation();
    const {menuInfo} = menu;
    let currentPage = location?.state?.key, pageTitle = menuInfo[currentPage]?.title, pageInfo = menuInfo[currentPage]?.cont;
    
    if(location.pathname === '/'){
        return (
            <Slider {...settings} className='mainSlider'>
                <div>
                    <p>
                        <strong>실시간 영화 순위를 확인하세요.</strong>
                        <span>Check out the real-time movie box office</span>
                    </p>
                    <img src={mainSlider01} alt='' />
                </div>
                <div>
                    <p>
                        <strong>실시간 영화 순위를 확인하세요.</strong>
                        <span>Check out the real-time movie box office</span>
                    </p>
                    <img src={mainSlider02} alt='' />
                </div>
            </Slider>
        )
    }else if(!pageTitle){
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