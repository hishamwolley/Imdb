import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import { useSelector, useDispatch } from "react-redux";
import { getMovieTvDetails } from "../redux/features/movieDB/movieTvDetailsSlice";
import { AiOutlineFieldTime } from "react-icons/ai";
import { getCredits } from "../redux/features/movieDB/creditsSlice";
import { getSimilar } from "../redux/features/movieDB/similarSlice";
import CarouselContainer from "../components/CarouselContainer";
import styles from "../Styles/MovieTvDeatils.module.scss";
import { toggleModal } from "../redux/features/navigation/navigationSlices";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import { API_KEY } from "../helpers/variables";

const TvMovieDetails = ({ type }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { movieTvDetails, loadingMovieTvDetails } = useSelector(
		(state) => state.movieTvDetails
	);
	const { credits, loadingCredits } = useSelector((state) => state.credits);
	const { similar, loadingSimilar } = useSelector((state) => state.similar);
	let production =
		type === "movie" ? "Director" : type === "tv" ? "Producers" : null;
	let directorName;
	let producers = [];
	if (!loadingCredits) {
		credits.crew.forEach((e) => {
			if (e.job === "Director") {
				directorName = e.name;
			} else if (e.job === "Producer") {
				producers.push(e);
			}
		});
	}
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

	const postData = async (url = "", data = {}) => {
		const response = await fetch(url, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return response.json();
	};

	const checkData = async (value) => {
		// guest session id could be stored in local storage for future use as docs mention that each device should contain one guest session/device. (not implemented)
		try {
			await fetch(
				`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
			)
				.then((data) => data.json())
				.then((data) => {
					return postData(
						`https://api.themoviedb.org/3/${type}/${id}/rating?api_key=${API_KEY}&guest_session_id=${data.guest_session_id}`,
						{ value: value }
					).then((data) => {
						console.log(data);
					});
				});
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		dispatch(getMovieTvDetails({ type: type, id: id }));
		dispatch(getCredits({ type: type, id: id }));
		dispatch(getSimilar({ type: type, id: id }));
	}, [id, type, dispatch]);

	return (
		<div className={styles.banner}>
			{!loadingMovieTvDetails ? (
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
			)}
			{!loadingMovieTvDetails && !loadingCredits && !loadingSimilar && (
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

						<div className={styles.details__directorContainer}>
							<p>{production}</p>
							<div>
								{type === "movie" ? (
									<p>{directorName}</p>
								) : type === "tv" ? (
									producers.map((producer) => {
										return <p key={producer.id}>{producer.name}</p>;
									})
								) : null}
							</div>
						</div>

						<div className={styles.details__creditsContainer}>
							<p>
								Cast
								<button
									onClick={() => {
										dispatch(toggleModal());
									}}
								>
									view all
								</button>
							</p>
							<div>
								{credits.cast.slice(0, 5).map((c) => {
									return <p key={c.id}>{c.name}</p>;
								})}
							</div>
						</div>
						<div className={styles.details__genresContainer}>
							<p>Genres</p>
							<div>
								{movieTvDetails.genres.map((genre) => {
									return <span key={genre.id}>{genre.name}</span>;
								})}
							</div>
						</div>
					</section>
					<section className={styles.details__flexContainer2}>
						<div className={styles.details__flexContainer2__rateContainer}>
							<p>Rate me!</p>
							<p>Average Rate {movieTvDetails.vote_average.toFixed(1)}</p>
							<p>Vote Count {movieTvDetails.vote_count}</p>
							<Rating
								onClick={(value) => {
									checkData(value);
								}}
								stop={10}
								fractions={2}
								initialRating={movieTvDetails.vote_average.toFixed(1)}
								emptySymbol={<BsStar color="#f3ce13" />}
								fullSymbol={<BsStarFill color="#f3ce13" />}
							/>
						</div>
					</section>
				</section>
			)}
			<h3 className={styles.similar}>Similar</h3>
			{!loadingSimilar && <CarouselContainer type={type} data={similar} />}
		</div>
	);
};

export default TvMovieDetails;
