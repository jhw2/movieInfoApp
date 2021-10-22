import axios from "axios";

export default axios.create({
  baseURL: "https://cors-jin.herokuapp.com/https://openapi.naver.com/v1/search",
  //baseURL: "http://18.220.253.22:8080/https://openapi.naver.com/v1/search",
  headers: {
    "Content-type": "application/json",
    'X-Naver-Client-Id': "QA8UjSKONNKwkAUuOXtp",
    'X-Naver-Client-Secret': "U5i5lbTaxm"
  }
});