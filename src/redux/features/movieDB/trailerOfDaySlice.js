import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	trailerOfDay: [],
	loadingTrailerOfDay: "idle",
};

export const getTrailerOfDay = createAsyncThunk(
	// Trailer of the day could be set from backend admin panel if their was any. Placed for visuals purposes
	"tailerOfDay/getTrailerOfDay",
	async (details, thunkAPI) => {
		let id;
		if (details.type === "movie") {
			id = "436270";
		} else if (details.type === "tv") {
			id = "1402";
		}

		try {
			const res = await fetch(
				`https://api.themoviedb.org/3/${details.type}/${id}?api_key=${API_KEY}&language=en-US`
			).then((data) => data.json());

			const trailerDetails = await fetch(
				`https://api.themoviedb.org/3/${details.type}/${id}/videos?api_key=${API_KEY}&language=en-US`
			).then((data) => data.json());

			return { ...trailerDetails, ...res };
		} catch (e) {
			console.log(e);
		}
	}
);

const trailerOfDay = createSlice({
	name: "trailerOfDay",
	initialState,
	reducers: {
		resetTrailerOfDay: (state) => initialState,
	},
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
export const { resetTrailerOfDay } = trailerOfDay.actions;

export const trailerOfDaySlice = trailerOfDay.reducer;
