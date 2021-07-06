
import { memo, useCallback, useState } from 'react';
import Loading from '../common';
import UserService from '../../http/UserService';

const FindPW = memo(({history})=>{

    const [isLodingDone, setIsLoadingDone] = useState(true);
    const [resetPw, setResetPw] = useState();

    const onPwReset = useCallback((e)=>{
        e.preventDefault();
        const signupForm = document.getElementById('findPwForm');
        const email = new FormData(signupForm);
        setIsLoadingDone(false);

        UserService.findPw(email).then(response=>{
            setIsLoadingDone(true);
            if(response.data.success){
                alert(response.data.msg);
                if(response.data.data !== 0){
                    setResetPw(response.data.data);
                }
            }
        }).catch(error=>{
            setIsLoadingDone(true);
            alert('비밀번호 초기화 실패');
        });
    }, [setResetPw]);

    return (
        <>
            <Loading done={isLodingDone} /> 
            <h4>비밀번호 찾기</h4>
            <form onSubmit={onPwReset} method='post' id='findPwForm'>
                <p><label><span>아이디</span><input type='email' name='email' placeholder='이메일(example@gmail.com)' required/></label></p>
                <input type='submit' value="비밀번호 초기화" /> 
            </form>
            {resetPw && 
                <div className='box'>
                    <p>초기화된 비밀번호는 <strong>{resetPw}</strong> 입니다.</p>
                    <p>로그인 후 비밀번호를 변경해 주세요.</p>
                </div>
            }
        </>
    );

})

export default FindPW;
