import { combineReducers } from "redux";
import movieRankReducer from "./movieRankModule";
import movieWeeklyRankReducer from "./movieWeeklyRankModule";
import movieDetailReducer from "./moviDetailInfoModule";
import actorListReducer from "./actorListModule";

const movieReducer = combineReducers({
    movieRankList: movieRankReducer,
    movieDetailInfo: movieDetailReducer,
    movieWeeklyRankList: movieWeeklyRankReducer,
    actorList: actorListReducer
});

export default movieReducer;