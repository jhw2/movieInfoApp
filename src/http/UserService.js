import http from "./http-common-user";

/**
 * url : http://3.142.245.197:8080/swagger-ui.html
 * 
 */
class UserService {
  signupUser(userData) { 
    return http.post(`/signup`, userData);
  }
  signoutUser() { 
    const config ={
      headers: {'X-AUTH-TOKEN': localStorage.getItem('token') }
    }
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


}

export default new UserService();