import { combineReducers } from "redux";
import movieRankReducer from "./movieRankModule";
import movieWeeklyRankReducer from "./movieWeeklyRankModule";
import movieDetailReducer from "./moviDetailInfoModule";
import actorListReducer from "./actorListModule";
import pagingReducer from "./pagingModule";
import actorDetailReducer from "./actorDetailInfoModul";

const movieReducer = combineReducers({
    movieRankList: movieRankReducer,
    movieDetailInfo: movieDetailReducer,
    movieWeeklyRankList: movieWeeklyRankReducer,
    actorList: actorListReducer,
    paging: pagingReducer,
    actorDetailInfo: actorDetailReducer
});

export default movieReducer;