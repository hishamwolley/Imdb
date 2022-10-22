import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import navigationSlices from "./features/navigation/navigationSlices";
import { topRatedSlice } from "./features/movieDB/topRatedSlice";
import { popularSlice } from "./features/movieDB/popularSlice";
import { movieTvDetailsSlice } from "./features/movieDB/movieTvDetailsSlice";
import { creditsSlice } from "./features/movieDB/creditsSlice";
import { similarSlice } from "./features/movieDB/similarSlice";
import { searchResultSlice } from "./features/movieDB/searchResultSlice";
export default configureStore(
	{
		reducer: {
			navigation: navigationSlices,
			topRated: topRatedSlice,
			popular: popularSlice,
			movieTvDetails: movieTvDetailsSlice,
			credits: creditsSlice,
			similar: similarSlice,
			searchResult: searchResultSlice,
		},
	},
	applyMiddleware(thunk)
);
