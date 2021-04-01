import { combineReducers } from "redux";
import movieRankReducer from "./movieRankModule";
import movieDetailReducer from "./moviDetailInfoModule";

const movieReducer = combineReducers({
    movieRankList: movieRankReducer,
    movieDetailInfo: movieDetailReducer
});

export default movieReducer;