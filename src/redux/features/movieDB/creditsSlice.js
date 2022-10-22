import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	credits: [],
	loadingCredits: "idle",
};

export const getCredits = createAsyncThunk(
	"credits/getCredits",
	async (details, thunkAPI) => {
		const res = await fetch(
			`https://api.themoviedb.org/3/${details.type}/${details.id}/credits?api_key=${API_KEY}&language=en-US`
		).then((data) => data.json());

		return { ...res };
	}
);
const credits = createSlice({
	name: "credits",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCredits.pending, (state) => {
			state.loadingCredits = true;
		});

		builder.addCase(getCredits.fulfilled, (state, { payload }) => {
			state.loadingCredits = false;
			state.credits = payload;
		});
		builder.addCase(getCredits.rejected, (state) => {
			state.loadingCredits = true;
		});
	},
});

export const creditsSlice = credits.reducer;
