import React, { useEffect } from "react";
import { FiMenu, FiSearch } from "react-icons/fi";
import styles from "../Styles/Header.module.scss";
import {
	sidebarOn,
	searchBarOn,
	searchResultOn,
	searchResultOff,
} from "../redux/features/navigation/navigationSlices.js";
import { useSelector, useDispatch } from "react-redux";
import SearchInputDropdownMobile from "./SearchInputDropdownMobile";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import throttle from "lodash.throttle";
import { getSearchResult } from "../redux/features/movieDB/searchResultSlice";
import SearchResultContainer from "./SearchResultContainer";

const Header = () => {
	const searchBar = useSelector((state) => state.navigation.searchBar);
	const searchResultCont = useSelector(
		(state) => state.navigation.searchResultCont
	);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const switchSidebarOn = () => {
		dispatch(sidebarOn());
	};

	const switchSearchBarOn = () => {
		dispatch(searchBarOn());
	};

	useEffect(() => {
		window.addEventListener(
			"resize",
			throttle(() => {
				if (window.innerWidth > 768) {
					dispatch(sidebarOn());
				}
			}, 200)
		);

		return () => {
			window.removeEventListener(
				"resize",
				throttle(() => {
					if (window.innerWidth > 768) {
						dispatch(sidebarOn());
					}
				}, 200)
			);
		};
	}, [dispatch]);

	return (
		<header className={styles.header}>
			<div className={styles.header__leftContainer}>
				<FiMenu
					onClick={switchSidebarOn}
					className={styles.header__leftContainer__menu}
					size={"20px"}
				/>
				<button
					onClick={() => {
						if (location.pathname === "/") {
							window.location.reload();
						} else {
							navigate("/");
						}
					}}
					className={styles.header__leftContainer__logo}
				>
					IMDB
				</button>
				<form>
					<input
						onChange={(e) => {
							if (!searchResultCont) {
								dispatch(searchResultOn());
							}
							if (!e.target.value) {
								dispatch(searchResultOff());
							}
							dispatch(getSearchResult(e.target.value));
						}}
						placeholder="Search IMDB"
						type={"text"}
						className={styles.header__leftContainer__mdSearchInput}
					/>

					{searchResultCont && <SearchResultContainer />}
				</form>
			</div>
			<div className={styles.header__rightContainer}>
				<FiSearch
					onClick={switchSearchBarOn}
					className={styles.header__rightContainer__searchLogo}
					size={"20px"}
				/>

				<NavLink
					end
					to="/"
					className={({ isActive }) =>
						isActive ? styles.header__isActive : null
					}
				>
					Movies
				</NavLink>

				<NavLink
					to="/tv"
					className={({ isActive }) =>
						isActive ? styles.header__isActive : null
					}
				>
					Tv Shows
				</NavLink>

				<NavLink
					className={({ isActive }) =>
						isActive
							? `${styles.header__isActive} ${styles.header__chartLink}`
							: null
					}
					to="/charts"
				>
					Charts
				</NavLink>
			</div>

			{searchBar && <SearchInputDropdownMobile />}
		</header>
	);
};

export default Header;
