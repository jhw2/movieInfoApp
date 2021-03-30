import { combineReducers } from "redux";
import movieRankReducer from "./movieRankModule";
import movieDetailReducer from "./moviDetailInfoModule";

const movieReducer = combineReducers({
    movieRankReducer,
    movieDetailReducer
});

export default movieReducer;