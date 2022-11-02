import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	popular: [],
	loadingPopular: "idle",
};

export const getPopular = createAsyncThunk(
	"popular/getPopular",

	async (type, thunkAPI) => {
		try {
			const res = await fetch(
				`https://api.themoviedb.org/3/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`
			).then((data) => data.json());
			return res;
		} catch (e) {}
	}
);
const popular = createSlice({
	name: "popular",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPopular.pending, (state) => {
			state.loadingPopular = true;
		});

		builder.addCase(getPopular.fulfilled, (state, { payload }) => {
			state.loadingPopular = false;
			state.popular = payload;
		});
		builder.addCase(getPopular.rejected, (state) => {
			state.loadingPopular = true;
		});
	},
});

export const popularSlice = popular.reducer;
