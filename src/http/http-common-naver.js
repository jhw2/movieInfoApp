import axios from "axios";

export default axios.create({
  baseURL: "/v1/search",
  headers: {
    "Content-type": "application/json",
    'X-Naver-Client-Id': "QA8UjSKONNKwkAUuOXtp",
    'X-Naver-Client-Secret': "U5i5lbTaxm"
  }
});