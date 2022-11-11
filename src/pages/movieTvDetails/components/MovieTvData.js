import React, { useEffect } from "react";
import styles from "../../../Styles/MovieTvDeatils.module.scss";
import RatingContainer from "./RatingContainer";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getMovieTvDetails } from "../../../redux/features/movieDB/movieTvDetailsSlice";
import { getCredits } from "../../../redux/features/movieDB/creditsSlice";
import Credits from "./Credits";
import Genres from "./Genres";
import ProducerDirector from "./ProducerDirector";

const MovieTvData = ({ type, id }) => {
	const dispatch = useDispatch();

	const { movieTvDetails, loadingMovieTvDetails } = useSelector(
		(state) => state.movieTvDetails
	);

	let runtime =
		type === "movie"
			? movieTvDetails.runtime
			: type === "tv"
			? movieTvDetails.episode_run_time
			: null;

	let releaseDate =
		type === "movie"
			? movieTvDetails.release_date
			: type === "tv"
			? movieTvDetails.first_air_date
			: null;

	useEffect(() => {
		dispatch(getMovieTvDetails({ type: type, id: id }));
		dispatch(getCredits({ type: type, id: id }));
	}, [id, type, dispatch]);

	return (
		!loadingMovieTvDetails && (
			<section className={styles.details}>
				<section className={styles.details__flexContainer1}>
					<div className={styles.details__runtimeReleaseContainers}>
						<p>Runtime: {runtime}</p>
						<AiOutlineFieldTime />
					</div>
					<div className={styles.details__runtimeReleaseContainers}>
						<p>Release date: {releaseDate}</p>
					</div>
					<div className={styles.details__languageContainer}>
						<p>Language:</p>
						<p>
							{movieTvDetails.original_language.charAt(0).toUpperCase() +
								movieTvDetails.original_language.slice(1)}
						</p>
					</div>
					<ProducerDirector type={type} />
					<Credits type={type} id={id} />
					<Genres movieTvDetails={movieTvDetails} />
				</section>
				<RatingContainer type={type} movieTvDetails={movieTvDetails} id={id} />
			</section>
		)
	);
};

export default MovieTvData;
