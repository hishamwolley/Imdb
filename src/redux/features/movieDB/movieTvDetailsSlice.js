import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	movieTvDetails: [],
	loadingMovieTvDetails: "idle",
};

export const getMovieTvDetails = createAsyncThunk(
	"movieTvDetails/getMovieTvDetails",
	async (details, thunkAPI) => {
		if (details.static) {
			let id;
			if (details.type === "movie") {
				id = "436270";
			} else if (details.type === "tv") {
				id = "84773";
			}

			const res = await fetch(
				`https://api.themoviedb.org/3/${details.type}/${id}?api_key=${API_KEY}&language=en-US`
			).then((data) => data.json());
			const trailerDetails = await fetch(
				`https://api.themoviedb.org/3/${details.type}/${id}/videos?api_key=${API_KEY}&language=en-US`
			).then((data) => data.json());

			console.log({ ...trailerDetails, ...res });

			return { ...trailerDetails, ...res };
		}

		const res = await fetch(
			`https://api.themoviedb.org/3/${details.type}/${details.id}?api_key=${API_KEY}&language=en-US`
		).then((data) => data.json());
		console.log({ ...res });

		const trailerDetails = await fetch(
			`https://api.themoviedb.org/3/${details.type}/${details.id}/videos?api_key=${API_KEY}&language=en-US`
		).then((data) => data.json());
		return { ...trailerDetails, ...res };
	}
);
const movieTvDetails = createSlice({
	name: "movieTvDetails",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getMovieTvDetails.pending, (state) => {
			state.loadingMovieTvDetails = true;
		});

		builder.addCase(getMovieTvDetails.fulfilled, (state, { payload }) => {
			state.loadingMovieTvDetails = false;
			state.movieTvDetails = payload;
		});
		builder.addCase(getMovieTvDetails.rejected, (state) => {
			state.loadingMovieTvDetails = true;
		});
	},
});

export const movieTvDetailsSlice = movieTvDetails.reducer;
