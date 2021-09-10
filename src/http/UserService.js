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
    return http.post(`/signout`, {});
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
    return http.post(`/update-password`, userData);
  }
  userProfile() {
    const userNo = localStorage.getItem('userNo');
    return http.get(`/${userNo}`);
  }

}

export default new UserService();