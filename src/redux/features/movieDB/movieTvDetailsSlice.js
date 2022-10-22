import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	movieTvDetails: [],
	loadingMovieTvDetails: "idle",
};

export const getMovieTvDetails = createAsyncThunk(
	"movieTvDetails/getMovieTvDetails",
	async (details, thunkAPI) => {
		let responseData = {};
		const res = await fetch(
			`https://api.themoviedb.org/3/${details.type}/${details.id}?api_key=${API_KEY}&language=en-US`
		)
			.then((data) => data.json())
			.then(async (data) => {
				responseData = data;
				return await fetch(
					`https://api.themoviedb.org/3/${details.type}/${details.id}/videos?api_key=${API_KEY}&language=en-US`
				).then((data) => data.json());
			});
		return { ...responseData, ...res };
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
