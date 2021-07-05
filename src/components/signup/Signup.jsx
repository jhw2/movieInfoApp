
import { memo, useCallback, useState } from 'react';
import Loading from '../common';
import UserService from '../../http/UserService';

const Signup = memo(({history})=>{

    const [isLodingDone, setIsLoadingDone] = useState(true);
    const [checkEmailTxt, setCheckEmailTxt] = useState('');
    const [isCheckEmail, setIsCheckEmail] = useState(false);

    const validateEmail = useCallback((e)=>{
        setIsCheckEmail(false);
        setCheckEmailTxt('')
    },[]);

    const checkEmail = useCallback((e)=>{
        const signupForm = document.getElementById('signupForm');
        const emailInput = document.querySelector('input[name=userEmail]');
        const email = emailInput.value;
        if(!email){
            emailInput.setCustomValidity("메일을 입력해주세요");
            signupForm.reportValidity();
            return false;
        }else{
            emailInput.setCustomValidity("");
        }
        setIsLoadingDone(false);
        UserService.checkEmail(email).then((response)=>{
            setIsLoadingDone(true);
            const {data, msg} = response.data;
            if(response.status === 200){
                setCheckEmailTxt(msg);
                if(data === 0){
                    setIsCheckEmail(true);
                }
                if(data > 0){
                    setIsCheckEmail(false);
                    emailInput.focus();
                }
            }else{
                alert('중복확인 실패');
            }
        })
    }, []);

    const checkPassword =  useCallback((e)=>{
        if(document.querySelector('input[name=userPwConfirm]').value !== document.querySelector('input[name=userPw]').value){
            e.target.setCustomValidity("비밀번호가 일치하지 않습니다");
        }else{
            e.target.setCustomValidity("");
        }
    }, [])

    const onSignup = useCallback((e)=>{
        e.preventDefault();
        const signupForm = document.getElementById('signupForm');
        const formData = new FormData(signupForm);

        if(!isCheckEmail){
            document.querySelector('input[name=userEmail]').setCustomValidity("이메일 중복확인을 해주세요.");
            signupForm.reportValidity();
            return false;
        }else{
            document.querySelector('input[name=userEmail]').setCustomValidity("");
        }
        
        setIsLoadingDone(false);
        const userPhone = formData.get('userPhone01') + formData.get('userPhone02') + formData.get('userPhone03');
        formData.append('userPhone', userPhone);
        UserService.signupUser(formData).then((response)=>{
            setIsLoadingDone(true);
            if(response.status === 200){
                alert(response.data.msg);
                history.push('/');
            }
            if(response.status === 400){
                alert('회원가입 실패');
                return false;
            }
        });
    }, [history, isCheckEmail]);

    return (
        <>
            <Loading done={isLodingDone} />
            <h4>회원가입을 해주세요.</h4>
            <form onSubmit={onSignup} method='post' id='signupForm'>
                <p>
                    <label><span>email</span><input type='email' name='userEmail' placeholder='이메일을 입력해주세요.' onChange={validateEmail} required/></label>
                    <input type='button' value='이메일중복확인' name='checkEmail' onClick={checkEmail} />
                    <span className={isCheckEmail ? 't-blue' : 't-red'}>{checkEmailTxt}</span>
                    <input type='hidden' name='checkEmail' value={isCheckEmail} />
                </p>
                <p><label><span>이름</span><input type='text'  name='userName' placeholder='이름을 입력해주세요.' required/></label></p>
                <p>
                    <label>
                        <span>별명</span>
                        <input type='text' name='userNic' placeholder='별명 입력해주세요.' pattern="^[a-zA-Z]+$" title='영문으로 입력해주세요.' maxLength='30' required/>
                    </label>
                    <span className='required'>영문으로 입력해주세요.</span>
                </p>
                <p>
                    <label>
                        <span>전화번호</span>
                        <select name='userPhone01' required>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option>
                            <option value="019">019</option>
                        </select>
                        <input type='number' name='userPhone02' minLength='4' maxLength='4' required/>
                        <input type='number' name='userPhone03' minLength='4' maxLength='4' required/>
                    </label>
                </p>
                <p>
                    <label>
                        <span>비밀번호</span>
                        <input type='password' name='userPw' onInput={checkPassword} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,25}$" title='영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상' placeholder='비밀번호를 입력해주세요.' required/>
                        <span className='required'>영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상</span>
                    </label>
                </p>
                <p>
                    <label>
                        <span>비밀번호 확인</span>
                        <input type='password' name='userPwConfirm' onInput={checkPassword} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,25}$" title='영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상' placeholder='비밀번호를 입력해주세요.' required/>
                        <span className='required'>영문 대문자, 소문자, 특수문자, 숫자 각1자 이상 최소 10자 이상</span>
                    </label>
                </p>

                <input type='submit' value="가입하기" />
            </form>
        </>
    );
})

export default Signup;
