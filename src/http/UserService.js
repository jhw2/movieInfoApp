import http from "./http-common-user";

/**
 * url : http://3.142.245.197:8080/swagger-ui.html
 * 
 */
class UserService {
  signupUser(userData) { 
    return http.post(`/signup`, userData);
  }

  checkEmail(email) { 
    return http.get(`/count`, {params: {email}});
  }

  loginUser(userData) { 
    return http.post(`/signin`, userData);
  }


}

export default new UserService();