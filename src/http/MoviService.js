import http from "./http-common";

/**
 * 
 * 
 */
class MoviService {
  getDailyBoxoffice(date, repNationCd) { 
    console.log(repNationCd)
    return http.get(`/boxoffice/searchDailyBoxOfficeList.json`, {params: {targetDt: date, repNationCd}});
  }

  getMovieDetailInfo(code) {
    return http.get(`/movie/searchMovieInfo.json`, {params: {movieCd: code}});
  }

}

export default new MoviService();