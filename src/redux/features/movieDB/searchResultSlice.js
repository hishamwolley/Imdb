import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	searchResult: [],
	loadingSearchResult: "idle",
};

export const getSearchResult = createAsyncThunk(
	"searchResult/getSearchResult",
	async (details, thunkAPI) => {
		if (details === "") {
			return;
		}
		try {
			const res = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${details}`
			).then((data) => data.json());

			return [...res.results];
		} catch (e) {
			console.log(e);
		}
	}
);
const searchResult = createSlice({
	name: "searchResult",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSearchResult.pending, (state) => {
			state.loadingSearchResult = true;
		});

		builder.addCase(getSearchResult.fulfilled, (state, { payload }) => {
			state.loadingSearchResult = false;
			state.searchResult = payload;
		});
		builder.addCase(getSearchResult.rejected, (state) => {
			state.loadingSearchResult = true;
		});
	},
});

export const searchResultSlice = searchResult.reducer;
