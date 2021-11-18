import React, { useEffect, useCallback } from 'react';
import kakao from '../../images/ic-kakao.svg';


const kakaoSettings = {
  objectType: 'feed',
  content: {
      title: 'MovieBox',
      description: '#영화박스오피스조회',
      imageUrl: 'http://moviebox.tabspace.kr/og.jpg', // '/logo.png'
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
  }
};

const KakaoShareBtn = () => {
  const kakaoInit = useCallback(() => {
    if (window.Kakao) {
        const kakao = window.Kakao
        // 중복 initialization 방지
        if (!kakao.isInitialized()) {
          kakao.init('0de5699ba345b8ca5dd1b443441e36c3');
        }
    }
  }, []);

  useEffect(() => {
    kakaoInit()
  },[kakaoInit]);

  const handleKakaoBtn =  useCallback(()=>{
    kakaoInit();
    window.Kakao.Link.sendDefault(kakaoSettings)
  },[kakaoInit]);
  
  return (
    <button id="kakao-link-btn" onClick={handleKakaoBtn}>
      <img src={kakao} alt="kakao-share-icon" />
    </button>
  )
}
export default KakaoShareBtn;