import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../../../helpers/variables";

const initialState = {
	similar: [],
	loadingSimilar: "idle",
};

export const getSimilar = createAsyncThunk(
	"similar/getSimilar",
	async (details, thunkAPI) => {
		try {
			const res = await fetch(
				`https://api.themoviedb.org/3/${details.type}/${details.id}/similar?api_key=${API_KEY}&language=en-US`
			).then((data) => data.json());

			return { ...res };
		} catch (e) {
			console.log(e);
		}
	}
);
const similar = createSlice({
	name: "similar",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSimilar.pending, (state) => {
			state.loadingSimilar = true;
		});

		builder.addCase(getSimilar.fulfilled, (state, { payload }) => {
			state.loadingSimilar = false;
			state.similar = payload;
		});
		builder.addCase(getSimilar.rejected, (state) => {
			state.loadingSimilar = true;
		});
	},
});

export const similarSlice = similar.reducer;
