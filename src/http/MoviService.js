import http from "./http-common";

/**
 * url : http://www.kobis.or.kr/kobisopenapi/
 * 
 */
class MoviService {
  getDailyBoxoffice(targetDt, repNationCd) { 
    return http.get(`/boxoffice/searchDailyBoxOfficeList.json`, {params: {targetDt, repNationCd}});
  }

  getWeeklyBoxOffice(targetDt, weekGb, repNationCd) {
    return http.get(`/boxoffice/searchWeeklyBoxOfficeList.json`, {params: {targetDt, weekGb, repNationCd}});
  }

  getMovieDetailInfo(code) {
    return http.get(`/movie/searchMovieInfo.json`, {params: {movieCd: code}});
  }

  getActorList({curPage, itemPerPage, peopleNm}) {
    return http.get(`/people/searchPeopleList.json`, {params: {curPage, itemPerPage, peopleNm}});
  }

}

export default new MoviService();