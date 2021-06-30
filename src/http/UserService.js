import http from "./http-common-user";

/**
 * url : http://3.142.245.197:8080/swagger-ui.html
 * 
 */
class UserService {
  signupUser(userData) { 
    return http.post(`/signup`, userData);
  }

  loginUser(userData) { 
    return http.post(`/login`, userData);
  }


}

export default new UserService();