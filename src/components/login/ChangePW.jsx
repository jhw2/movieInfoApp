
import { memo, useCallback, useState, useRef } from 'react';
import Loading from '../common';
import UserService from '../../http/UserService';

const ChangePW = memo(({history})=>{

    const [isLodingDone, setIsLoadingDone] = useState(true);
    const userPw = useRef();
    const userPwConfirm = useRef();

    const checkPassword = useCallback((e)=>{
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,25}$/;
        if(!e.target.value){
            e.target.setCustomValidity("비밀번호를 입력해주세요");
        }else if(e.target.value.search(pattern)){
            e.target.setCustomValidity("영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상");
        }else if(userPwConfirm.current.value !== userPw.current.value){
            e.target.setCustomValidity("비밀번호가 일치하지 않습니다");
        }else{
            e.target.setCustomValidity("");
        }
    }, [userPw, userPwConfirm]);

    const onPwChange = (e)=>{
        e.preventDefault();
        const signupForm = document.getElementById('findIdForm');
        const userData = new FormData(signupForm);
        setIsLoadingDone(false);

        UserService.changePw(userData).then(response=>{
            setIsLoadingDone(true);
            if(response.data.success){
                alert(response.data.msg);
                history.push('/');
            }else{
                alert('비밀번호 변경 실패');
            }
        }).catch(error=>{
            setIsLoadingDone(true);
            alert('비밀번호 변경 실패');
        });
    }

    return (
        <>
            <Loading done={isLodingDone} /> 
            <h4>비밀번호 변경</h4>
            <form onSubmit={onPwChange} method='post' className='formBox' id='findIdForm'>
                <p>
                    <label>
                        <span>비밀번호</span>
                        <input type='password' name='userPw' ref={userPw} onInput={checkPassword} placeholder='새로운 비밀번호를 입력해주세요.' required/>
                    </label>
                    <span className='required'>영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상</span>
                </p>
                <p>
                    <label>
                        <span>비밀번호 확인</span>
                        <input type='password' name='userPwConfirm' ref={userPwConfirm} onInput={checkPassword} placeholder=' 새로운 비밀번호를 입력해주세요.' required/>
                    </label>
                    <span className='required'>영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상</span>
                </p>
                <input type='submit' value="비밀번호 변경" /> 
            </form>
        </>
    );

})

export default ChangePW;
