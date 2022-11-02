import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	topRatedTv: [],
	loadingTopRatedTv: "idle",
};

export const getTopRatedTv = createAsyncThunk(
	"topRatedTv/getTopRatedTv",
	async (details, thunkAPI) => {
		try {
			const res = await fetch(
				`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${details.page}`
			).then((data) => data.json());
			return res;
		} catch (e) {
			console.log(e);
		}
	}
);

const topRatedTv = createSlice({
	name: "topRatedTv",
	initialState,
	reducers: {
		resetTopRated: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getTopRatedTv.pending, (state) => {
			state.loadingTopRatedTv = true;
		});

		builder.addCase(getTopRatedTv.fulfilled, (state, { payload }) => {
			state.loadingTopRatedTv = false;
			if (payload.page === 1) {
				state.topRatedTv = [...payload.results];
			} else if (payload.page > 1) {
				state.topRatedTv = [].concat(...state.topRatedTv, payload.results);
			}
		});
		builder.addCase(getTopRatedTv.rejected, (state) => {
			state.loadingTopRatedTv = true;
		});
	},
});

export const topRatedTvSlice = topRatedTv.reducer;
