import { combineReducers } from "redux";
import movieRankReducer from "./movieRankModule";
import movieWeeklyRankReducer from "./movieWeeklyRankModule";
import movieDetailReducer from "./moviDetailInfoModule";

const movieReducer = combineReducers({
    movieRankList: movieRankReducer,
    movieDetailInfo: movieDetailReducer,
    movieWeeklyRankList: movieWeeklyRankReducer
});

export default movieReducer;