import React, { useRef, useCallback, useState } from "react";
import TopRatedMapping from "./TopRatedMapping";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Styles/Home.module.scss";
import { getTopRated } from "../../../redux/features/movieDB/topRatedSlice";
import { getTopRatedTv } from "../../../redux/features/movieDB/topRatedTvSlice";

const TopRatedSection = ({ type }) => {
	const dispatch = useDispatch();
	const { topRated, loadingTopRated } = useSelector((state) => state.topRated);
	const { topRatedTv, loadingTopRatedTv } = useSelector(
		(state) => state.topRatedTv
	);
	const [page, setPage] = useState(1);
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

	return (
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
	);
};

export default TopRatedSection;
