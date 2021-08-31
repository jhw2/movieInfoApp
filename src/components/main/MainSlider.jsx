import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common';
import noImage from '../../images/no-data.jpg';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [ 
        {  
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            } 
        },
        {  
            breakpoint: 769,
            settings: {
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {  
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2,
            } 
        }
    ]
};
const MainSlider = memo(({movieList, title, done})=>{
    if(movieList.length > 0){
        return(
            <div className='mainSliderGrp'>
                <div className='group'>
                    <h3>{title}</h3>
                    <Slider {...settings}>
                        {
                            movieList.map((movie, i)=>{
                                let {rankOldAndNew, movieNm, openDt, audiAcc, movieCd, poster} = movie;
                                if(!poster || poster === 'no-data'){ 
                                    poster = noImage;
                                }
                                const linkOption = {pathname: '/movieDetail/'+movieCd, state: {poster: poster, key: 'movieDetail'}};
                                return (
                                    <div key={movieCd}>
                                        <img src={poster} alt={movieNm + '포스터'} />
                                        <h6><Link to={linkOption}><strong className={rankOldAndNew}>{rankOldAndNew}</strong>{movieNm}</Link></h6>
                                        <ul>
                                            <li><em>관객수</em><span>{audiAcc.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></li>
                                            <li><em>개봉일</em><span>{openDt}</span></li>
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        )
    }else{
        return (
            <div className='mainSliderGrp'>
                <div className='group'>
                    <Loading done={done}></Loading>
                    <h3>{title}</h3>
                </div>
            </div>
        )
    }
        
})

export default MainSlider;