import { combineReducers } from "redux";
import movieRankReducer from "./movieRankModule";
import movieWeeklyRankReducer from "./movieWeeklyRankModule";
import movieDetailReducer from "./moviDetailInfoModule";
import actorListReducer from "./actorListModule";
import pagingReducer from "./pagingModule";

const movieReducer = combineReducers({
    movieRankList: movieRankReducer,
    movieDetailInfo: movieDetailReducer,
    movieWeeklyRankList: movieWeeklyRankReducer,
    actorList: actorListReducer,
    paging: pagingReducer
});

export default movieReducer;