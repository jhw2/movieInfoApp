import http from "./http-common-user";

/**
 * url : http://localhost:8081/swagger-ui.html
 * 
 */
class UserService {
  signupUser(userData) { 
    return http.post(`/signup`, userData);
  }
  signoutUser() { 
    const config ={headers: {'X-AUTH-TOKEN': localStorage.getItem('token')}}
    return http.post(`/signout`, {}, config);
  }
  checkEmail(email) { 
    return http.get(`/count`, {params: {email}});
  }
  loginUser(userData) { 
    return http.post(`/signin`, userData);
  }
  findPw(email ) { 
    return http.post(`/reset`, email );
  }
  changePw(userData) { 
    const config ={headers: {'X-AUTH-TOKEN': localStorage.getItem('token')}}
    return http.post(`/update-password`, userData, config);
  }
  userProfile() {
    const config ={headers: {'X-AUTH-TOKEN': localStorage.getItem('token')}}
    const userNo = localStorage.getItem('userNo');
    return http.get(`/${userNo}`, config);
  }

}

export default new UserService();