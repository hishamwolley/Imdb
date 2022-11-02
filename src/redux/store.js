import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import navigationSlices from "./features/navigation/navigationSlices";
import { topRatedSlice } from "./features/movieDB/topRatedSlice";
import { topRatedTvSlice } from "./features/movieDB/topRatedTvSlice";
import { popularSlice } from "./features/movieDB/popularSlice";
import { movieTvDetailsSlice } from "./features/movieDB/movieTvDetailsSlice";
import { creditsSlice } from "./features/movieDB/creditsSlice";
import { similarSlice } from "./features/movieDB/similarSlice";
import { searchResultSlice } from "./features/movieDB/searchResultSlice";
import { trailerOfDaySlice } from "./features/movieDB/trailerOfDaySlice";
export default configureStore(
	{
		reducer: {
			navigation: navigationSlices,
			topRated: topRatedSlice,
			topRatedTv: topRatedTvSlice,
			popular: popularSlice,
			movieTvDetails: movieTvDetailsSlice,
			credits: creditsSlice,
			similar: similarSlice,
			searchResult: searchResultSlice,
			trailerOfDay: trailerOfDaySlice,
		},
	},
	applyMiddleware(thunk)
);
