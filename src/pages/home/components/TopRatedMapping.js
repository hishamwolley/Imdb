import React, { forwardRef } from "react";
// import TopRatedMovieTvPost from "./TopRatedMovieTvPost";
import TopRatedMovieTvPost from "./TopRatedMovieTvPost";
import styles from "../../../Styles/Home.module.scss";

const TopRatedMapping = forwardRef(({ topRatedPosts, type }, ref) => {
	return topRatedPosts.map((movie, index) => {
		if (topRatedPosts.length === index + 1) {
			return (
				<TopRatedMovieTvPost
					movieTv={movie}
					styles={styles}
					type={type}
					key={movie.id}
					ref={ref}
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
	});
});

export default TopRatedMapping;
