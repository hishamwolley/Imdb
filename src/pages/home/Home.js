import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../Styles/Home.module.scss";
import { getTopRated } from "../../redux/features/movieDB/topRatedSlice";
import { getTopRatedTv } from "../../redux/features/movieDB/topRatedTvSlice";
import { getPopular } from "../../redux/features/movieDB/popularSlice";
import { getTrailerOfDay } from "../../redux/features/movieDB/trailerOfDaySlice";
import { useLocation } from "react-router-dom";
import TopRatedMapping from "./components/TopRatedMapping";
import BannerSection from "./components/BannerSection";
import PopularSection from "./components/PopularSection";

const Home = ({ type }) => {
	// page state for top rated infinite loading
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const location = useLocation();

	let popularTypeString =
		type === "movie"
			? "Popular Movies"
			: type === "tv"
			? "Popular Tv Shows"
			: null;

	let topRatedTypeString =
		type === "movie"
			? "Top Rated Movies"
			: type === "tv"
			? "Top Rated Tv Shows"
			: null;

	// Movies & Shows states
	const { topRated, loadingTopRated } = useSelector((state) => state.topRated);
	const { topRatedTv, loadingTopRatedTv } = useSelector(
		(state) => state.topRatedTv
	);
	// detect last grid container movie || Tv container post
	const observer = useRef();
	const gridPostRef = useCallback(
		(node) => {
			if (type === "movie") {
				if (loadingTopRated) return;
			}
			if (type === "tv") {
				if (loadingTopRatedTv) return;
			}
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPage(page + 1);
					if (type === "movie") {
						dispatch(getTopRated({ page }));
					}
					if (type === "tv") {
						dispatch(getTopRatedTv({ page }));
					}
				}
			});
			if (node) observer.current.observe(node);
		},
		[page, loadingTopRated, loadingTopRatedTv, dispatch, type]
	);

	useEffect(() => {
		if (type === "movie") {
			dispatch(getTrailerOfDay({ type: type }));
			dispatch(getPopular(type));
			if (loadingTopRated === "idle") {
				dispatch(getTopRated({ page }));
			}
		}
		if (type === "tv") {
			dispatch(getTrailerOfDay({ type: type }));
			dispatch(getPopular(type));
			if (loadingTopRatedTv === "idle") {
				dispatch(getTopRatedTv({ page }));
			}
		}
	}, [page, location, dispatch, type, loadingTopRated, loadingTopRatedTv]);

	return (
		<div className={styles.moviesHome}>
			<BannerSection type={type} />
			<h3>{popularTypeString}</h3>
			<PopularSection type={type} />
			<h3>{topRatedTypeString}</h3>

			<section className={styles.moviesHome__topRatedMovies}>
				{type === "movie" && (
					<TopRatedMapping
						type={type}
						ref={gridPostRef}
						topRatedPosts={topRated}
					/>
				)}

				{type === "tv" && (
					<TopRatedMapping
						type={type}
						ref={gridPostRef}
						topRatedPosts={topRatedTv}
					/>
				)}
			</section>
		</div>
	);
};

export default Home;
