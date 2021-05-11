import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
};
const MainSlider = memo(({movieList, title, done})=>{
    return(
        <div className='mainSliderGrp'>
            <Loading done={done}></Loading>
            <h3>{title}</h3>
            <Slider {...settings}>
                {
                    movieList.map((movie, i)=>{
                        const {rank, rankInten, rankOldAndNew, movieNm, openDt, audiAcc, movieCd, poster} = movie;
                        return (
                            <div key={movieCd}>
                                <img src={poster} alt={movieNm + '포스터'} />
                                <strong>{rankOldAndNew} {rankInten} {rank}</strong>
                                <h6><Link to={{pathname: '/movieDetail/'+movieCd, state: {poster: poster, key: 'movieDetail'}}}>{movieNm}</Link></h6>
                                <p><em>개봉</em><span>{openDt}</span></p>
                                <p><em>누적</em><span>{audiAcc}</span></p>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
        
})

export default MainSlider;