import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Styles/Home.module.scss";
import CarouselContainer from "../components/CarouselContainer";
import { getTopRated } from "../redux/features/movieDB/topRatedSlice";
import { getPopular } from "../redux/features/movieDB/popularSlice";
import { getMovieTvDetails } from "../redux/features/movieDB/movieTvDetailsSlice";
import TopRatedMovieTvPost from "../components/TopRatedMovieTvPost";
import Banner from "../components/Banner";

const Home = ({ type }) => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	let popularType =
		type === "movie"
			? "Popular Movies"
			: type === "tv"
			? "Popular Tv Shows"
			: null;

	let topRatedType =
		type === "movie"
			? "Top Rated Movies"
			: type === "tv"
			? "Top Rated Tv Shows"
			: null;

	const { popular, loadingPopular } = useSelector((state) => state.popular);

	const { topRated, loadingTopRated } = useSelector((state) => state.topRated);

	const { movieTvDetails, loadingMovieTvDetails } = useSelector(
		(state) => state.movieTvDetails
	);
	const observer = useRef();
	const gridPostRef = useCallback(
		(node) => {
			if (loadingTopRated) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPage(page + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[page, loadingTopRated]
	);

	useEffect(() => {
		dispatch(getMovieTvDetails({ type: type, static: true }));
		dispatch(getPopular(type));
		dispatch(getTopRated({ type, page }));
	}, [dispatch, type, page]);

	return (
		<div className={styles.moviesHome}>
			{!loadingMovieTvDetails ? (
				<Banner
					movieTv={movieTvDetails}
					type={type}
					videoKey={
						movieTvDetails.results[0].key
							? movieTvDetails.results[movieTvDetails.results.length - 1].key
							: null
					}
					isHome={true}
				/>
			) : (
				<section className={styles.moviesHome__emptyContainer}></section>
			)}
			<h3>{popularType}</h3>
			{loadingPopular ? (
				<div style={{ width: "100%", height: "500px" }}></div>
			) : (
				<CarouselContainer type={type} data={popular} />
			)}
			<h3>{topRatedType}</h3>

			<section className={styles.moviesHome__topRatedMovies}>
				{/* Resetting state in Wrapper component on route change */}
				{topRated.map((movie, index) => {
					if (topRated.length === index + 1) {
						return (
							<TopRatedMovieTvPost
								movieTv={movie}
								styles={styles}
								type={type}
								key={movie.id}
								ref={gridPostRef}
							/>
						);
					} else {
						return (
							<TopRatedMovieTvPost
								movieTv={movie}
								styles={styles}
								type={type}
								key={movie.id}
							/>
						);
					}
				})}
			</section>
		</div>
	);
};

export default Home;
