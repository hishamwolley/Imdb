import React, { useEffect } from "react";
import { getTrailerOfDay } from "../redux/features/movieDB/trailerOfDaySlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Styles/Home.module.scss";
import Banner from "../components/Banner";

const BannerSection = ({ type }) => {
	useEffect(() => {}, []);
	const { trailerOfDay, loadingTrailerOfDay } = useSelector(
		(state) => state.trailerOfDay
	);
	return !loadingTrailerOfDay ? (
		<Banner
			movieTv={trailerOfDay}
			type={type}
			videoKey={
				trailerOfDay.results[0].key
					? trailerOfDay.results[trailerOfDay.results.length - 1].key
					: null
			}
			isHome={true}
		/>
	) : (
		<section className={styles.moviesHome__emptyContainer}></section>
	);
};

export default BannerSection;
