import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	searchBarOff,
	sidebarOff,
} from "../redux/features/navigation/navigationSlices";
import { AiOutlineClose } from "react-icons/ai";
import throttle from "lodash.throttle";
import styles from "../Styles/SearchInput.module.scss";

const SearchInputDropdown = () => {
	const [searchBarTransition, setSearchBarTransition] = useState(false);
	const searchBar = useSelector((state) => state.navigation.searchBar);
	const dispatch = useDispatch();

	useEffect(() => {
		if (searchBar) {
			setSearchBarTransition(true);
			dispatch(sidebarOff());
		}

		window.addEventListener(
			"resize",
			throttle(() => {
				if (window.innerWidth > 768) {
					dispatch(searchBarOff());
				}
			}, 250)
		);

		return window.removeEventListener(
			"resize",
			throttle(() => {
				if (window.innerWidth > 768) {
					dispatch(searchBarOff());
				}
			}, 250)
		);
	}, [searchBar, dispatch]);

	const switchSearchBarOff = () => {
		setSearchBarTransition(false);
		dispatch(searchBarOff());
	};

	return (
		<>
			{searchBar && (
				<div
					className={`${styles.searchInput} ${
						searchBarTransition && styles.searchInput__searchBarOn
					} `}
				>
					<input type={"text"} placeholder="Search IMDB" />
					<AiOutlineClose
						onClick={switchSearchBarOff}
						color="#fff"
						className={styles.searchInput__close}
					/>
				</div>
			)}
		</>
	);
};

export default SearchInputDropdown;
