
import { memo, useCallback, useState, useRef } from 'react';
import Loading from '../common';
import UserService from '../../http/UserService';

const Login = memo(({history})=>{

    const [isLodingDone, setIsLoadingDone] = useState(true);
    const saveId = localStorage.getItem('saveId');
    const saveIdCk = useRef();

    const onSignup = useCallback((e)=>{
        e.preventDefault();
        const signupForm = document.getElementById('loginForm');
        const formData = new FormData(signupForm);
        const userId = formData.get('userId');

        if(userId && saveIdCk.current.checked){
            localStorage.setItem('saveId', userId)
        }
        if(userId && !saveIdCk.current.checked){
            localStorage.removeItem('saveId')
        }
        // setIsLoadingDone(false);
        // UserService.loginUser(formData).then((response)=>{
        //     setIsLoadingDone(true);
        //     if(response.status === 200){
        //         console.log(response.data);
        //         history.push('/');
        //     }
        //     if(response.status === 400){
        //         alert('아이디 혹은 비밀번호를 확인해주세요');
        //         return false;
        //     }
        // });
    }, [history]);

    return (
        <>
            <Loading done={isLodingDone} /> 
            <h4>로그인을 해주세요.</h4>
            <form onSubmit={onSignup} method='post' id='loginForm'>
                <p><label><span>아이디</span><input type='email' name='userId' placeholder='이메일(example@gmail.com)' defaultValue={saveId} required/></label></p>
                <p>
                    <label>
                        <span>비밀번호</span>
                        <input type='password' name='userPw' placeholder='비밀번호를 입력해주세요.' required/>
                    </label>
                </p>
                <p>
                    <label><input type='checkbox' name='saveId' ref={saveIdCk} defaultChecked={saveId ? true : false} /> 아이디 저장</label>
                </p>
                <input type='submit' value="로그인" />
            </form>
        </>
    );
})

export default Login;
