  
import axios from "axios";

export default axios.create({
  baseURL: "http://www.kobis.or.kr/kobisopenapi/webservice/rest",
  headers: {
    "Content-type": "application/json"
  },
  params: {
      key: '444bbc2f73212088b88748c87e66204b'
  }
}); 