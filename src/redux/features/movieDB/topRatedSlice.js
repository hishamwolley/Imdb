import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	topRated: [],
	loadingTopRated: "idle",
};

export const getTopRated = createAsyncThunk(
	"topRated/getTopRated",
	async (details, thunkAPI) => {
		const res = await fetch(
			`https://api.themoviedb.org/3/${details.type}/top_rated?api_key=${API_KEY}&language=en-US&page=${details.page}`
		).then((data) => data.json());
		console.log(res);
		return res;
	}
);

const topRated = createSlice({
	name: "topRated",
	initialState,
	reducers: {
		resetTopRated: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getTopRated.pending, (state) => {
			state.loadingTopRated = true;
		});

		builder.addCase(getTopRated.fulfilled, (state, { payload }) => {
			state.loadingTopRated = false;
			if (payload.page === 1) {
				state.topRated = [...payload.results];
			} else if (payload.page > 1) {
				state.topRated = [].concat(...state.topRated, payload.results);
			}
		});
		builder.addCase(getTopRated.rejected, (state) => {
			state.loadingTopRated = true;
		});
	},
});
export const { resetTopRated } = topRated.actions;

export const topRatedSlice = topRated.reducer;
