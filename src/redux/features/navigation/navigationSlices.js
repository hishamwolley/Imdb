import { createSlice } from "@reduxjs/toolkit";

export const navigationSlices = createSlice({
	name: "navigation",
	initialState: {
		searchBar: false,
		sidebar: false,
		modal: false,
		searchResultCont: false,
	},
	reducers: {
		searchBarOn: (state) => {
			state.searchBar = true;
		},
		searchBarOff: (state) => {
			state.searchBar = false;
		},

		sidebarOn: (state) => {
			state.sidebar = true;
		},

		sidebarOff: (state) => {
			state.sidebar = false;
		},

		toggleSidebar: (state) => {
			state.sidebar = !state.sidebar;
		},

		toggleModal: (state) => {
			state.modal = !state.modal;
		},
		searchResultOff: (state) => {
			state.searchResultCont = false;
		},
		searchResultOn: (state) => {
			state.searchResultCont = true;
		},
	},
});

export const {
	searchBarOn,
	searchBarOff,
	sidebarOn,
	sidebarOff,
	toggleSidebar,
	toggleModal,
	searchResultOff,
	searchResultOn,
} = navigationSlices.actions;

export default navigationSlices.reducer;
