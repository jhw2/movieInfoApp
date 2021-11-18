import { memo } from 'react';
import KakaoShareBtn from '../kakaoShareBtn';
const Footer = memo(()=>{
    return (
        <footer>
            <div className='group'>
                Copyright ⓒ 2021 HyeWonJin. All rights reserved.
                <div className='right'>
                    <KakaoShareBtn />
                </div>
            </div>
        </footer>
    );
})

export default Footer;