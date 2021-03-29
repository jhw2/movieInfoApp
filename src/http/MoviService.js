import http from "./http-common";

/**
 * 
 * 
 */
class MoviService {
  getDailyBoxoffice(date) {
    return http.get(`/boxoffice/searchDailyBoxOfficeList.json`, {params: {targetDt: date}});
  }

  getMovieDetailInfo(code) {
    return http.get(`/movie/searchMovieInfo.json`, {params: {movieCd: code}});
  }

}

export default new MoviService();