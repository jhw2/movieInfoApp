
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../http/UserService';

const ChangePW = memo(()=>{
    const [userTable, setUserTable] = useState();

    const phoneFormatter = (num, type)=> {
        let formatNum = '';
        try{
           if (num.length === 11) {
              if (type === 0) {
                 formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
              } else {
                 formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
              }
           } else if (num.length === 8) {
              formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
           } else {
              if (num.indexOf('02') === 0) {
                 if (type === 0) {
                    formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
                 } else {
                    formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                 }
              } else {
                 if (type === 0) {
                    formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
                 } else {
                    formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                 }
              }
           }
        } catch(e) {
           formatNum = num;
           console.log(e);
        }
        return formatNum;
     }
     
     
     

    useEffect(()=>{
        UserService.userProfile().then(response=>{
            if(response.status === 200){
                const {userEmail, userRealName, userNic, userPhone} = response.data.data;
                const userTable = <table className='table detail userTable'>
                    <tbody>
                        <tr>
                            <th width='20%'>아이디</th>
                            <td>{userEmail}<Link to='/ChangePW'>비밀번호변경</Link></td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>{userRealName}</td>
                        </tr>
                        <tr>
                            <th>닉네임</th>
                            <td>{userNic}</td>
                        </tr>
                        <tr>
                            <th>핸드폰번호</th>
                            <td>{phoneFormatter(userPhone)}</td>
                        </tr>
                    </tbody>
                </table>

                setUserTable(userTable);

            }else{
                alert('회원정보 조회 오류');
            }

        }).catch(error=>{
            console.log(error);
            alert('회원정보 조회 오류');
        })
    }, []);

    return (
        <>
            {userTable}
        </>
    );

})

export default ChangePW;
