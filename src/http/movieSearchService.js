
import http from "./http-common-naver";

class MovieSearchService {
    getSearchPoster(query) { 
    return http.get(`/movie.json`, {params: {query}});
    }

}
export default new MovieSearchService();