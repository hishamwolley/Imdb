import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	trailerOfDay: [],
	loadingTrailerOfDay: "idle",
};

export const getTrailerOfDay = createAsyncThunk(
	// Trailer of the day could be set from backend admin panel if their was any. Placed for visuals purposes
	"tailerOfDay/getTrailerOfDay",
	async (type, thunkAPI) => {
		if (type === "movie") {
			let details = "";
			const res = await fetch(
				`https://api.themoviedb.org/3/movie/436270?api_key=${API_KEY}&language=en-US`
			)
				.then((data) => data.json())
				.then(async (data) => {
					details = data;
					return await fetch(
						`https://api.themoviedb.org/3/movie/${details.id}/videos?api_key=${API_KEY}&language=en-US`
					).then((data) => data.json());
				});
			// else if statement since movie/tv id is static
			return { ...details, ...res };
		} else if (type === "tv") {
			let details = "";
			const res = await fetch(
				`https://api.themoviedb.org/3/tv/60625?api_key=${API_KEY}&language=en-US`
			)
				.then((data) => data.json())
				.then(async (data) => {
					details = data;
					return await fetch(
						`https://api.themoviedb.org/3/tv/${details.id}/videos?api_key=${API_KEY}&language=en-US`
					).then((data) => data.json());
				});

			return { ...details, ...res };
		}
	}
);

const trailerOfDay = createSlice({
	name: "trailerOfDay",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTrailerOfDay.pending, (state) => {
			state.loadingTrailerOfDay = true;
		});

		builder.addCase(getTrailerOfDay.fulfilled, (state, { payload }) => {
			state.loadingTrailerOfDay = false;
			state.trailerOfDay = payload;
		});
		builder.addCase(getTrailerOfDay.rejected, (state) => {
			state.loadingTrailerOfDay = true;
		});
	},
});

export const trailerOfDaySlice = trailerOfDay.reducer;
