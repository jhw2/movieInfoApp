import React from 'react';

const auto = (Component, option)=>{
    //option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능
    const authCheck = (props)=>{
        const auth = localStorage.getItem('token');
        if(!auth){
            if(option){
                alert('로그인 후 이용 가능한 페이지 입니다.');
                props.history.push('/login');
            }
        }else{
            if(option === false){
                props.history.push('/');
            }
        }
        return <Component {...props} />;
    }
    return authCheck;
}
export default auto;