
import { memo, useCallback, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import Loading from '../common';
import { loginUser } from '../../modules/userInfoModule';

const Login = memo(({history})=>{

    const dispatch = useDispatch();
    const [isLodingDone, setIsLoadingDone] = useState(true);
    const saveId = localStorage.getItem('saveId');
    const saveIdCk = useRef();

    const onSignup = useCallback((e)=>{
        e.preventDefault();
        const signupForm = document.getElementById('loginForm');
        const userData = new FormData(signupForm);
        const userId = userData.get('userId');

        setIsLoadingDone(false);

        dispatch(loginUser(userData))
        .then(({payload})=>{
            setIsLoadingDone(true);
            if(payload.success){ 
                if(userId && saveIdCk.current.checked){
                    localStorage.setItem('saveId', payload.data.userEmail);
                }
                if(userId && !saveIdCk.current.checked){
                    localStorage.removeItem('saveId');
                }
                localStorage.setItem('userId', payload.data.userEmail);
                localStorage.setItem('userNic', payload.data.userNic);
                localStorage.setItem('token', payload.data.userToken);
                history.go(-1);
            }
        })
        .catch(error=>{
            setIsLoadingDone(true);
            if(!error.response || error.response.status === 500){
                alert('로그인실패');
                return false;
            }
            if(!error.response.data.success){alert(error.response.data.msg);}
        })
    }, [history, dispatch]);

    return (
        <>
            <Loading done={isLodingDone} /> 
            <h4>로그인을 해주세요.</h4>
            <form onSubmit={onSignup} method='post' id='loginForm'>
                <p><label><span>아이디</span><input type='email' name='userId' placeholder='이메일(example@gmail.com)' defaultValue={saveId} required/></label></p>
                <p>
                    <label>
                        <span>비밀번호</span>
                        <input type='password' name='password' placeholder='비밀번호를 입력해주세요.' required/>
                    </label>
                </p>
                <p>
                    <label><input type='checkbox' name='saveId' ref={saveIdCk} defaultChecked={saveId ? true : false} /> 아이디 저장</label>
                </p>
                <input type='submit' value="로그인" />
                <p><a href='/findPw'>비밀번호찾기</a></p>
            </form>
        </>
    );
})

export default Login;
