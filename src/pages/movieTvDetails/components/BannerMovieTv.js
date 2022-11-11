import React from "react";
import { useSelector } from "react-redux";
import Banner from "../../../globalComponents/Banner";
import styles from "../../../Styles/MovieTvDeatils.module.scss";

const BannerMovieTv = ({ type }) => {
	const { movieTvDetails, loadingMovieTvDetails } = useSelector(
		(state) => state.movieTvDetails
	);
	return !loadingMovieTvDetails ? (
		<Banner
			movieTv={movieTvDetails}
			type={type}
			videoKey={
				movieTvDetails.results.length > 1
					? movieTvDetails.results[movieTvDetails.results.length - 1].key
					: null
			}
			isHome={false}
		/>
	) : (
		<section className={styles.banner__emptyContainer}></section>
	);
};

export default BannerMovieTv;
