import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { userAuth } from '../modules/userInfoModule';

const Auth = (Component, option)=>{
    //option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능
    const AuthCheck = (props)=>{
        const dispatch = useDispatch();
        const token = localStorage.getItem('token');

        useEffect(()=>{
            if(token){
                dispatch(userAuth()).then(response=>{
                    if(!response.payload.success){
                         localStorage.removeItem('userNo');
                         localStorage.removeItem('token');
                        if(option){
                            alert('로그인 후 이용 가능한 페이지 입니다.');
                            props.history.push('/login');
                        }
                    }else{
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }).catch(error=>{
                    localStorage.removeItem('userNo');
                    localStorage.removeItem('token');
                });
            }else{
                if(option){
                    props.history.push('/login');
                }
            }
        },[props.history, dispatch, token])

        return <Component {...props} />;
    }
    return AuthCheck;
}
export default Auth;