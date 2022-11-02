import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Home.module.scss";

const Banner = ({ movieTv, type, videoKey, isHome }) => {
	let title =
		type === "movie"
			? movieTv.title
			: type === "tv"
			? movieTv.original_name
			: null;
	return (
		<section
			className={styles.moviesHome__trailerOfTheDay}
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieTv.poster_path}),linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)) `,
			}}
		>
			<div className={styles.moviesHome__trailerOfTheDay__details}>
				<h1>{title}</h1>

				{isHome ? (
					<div className={styles.moviesHome__trailerOfTheDay__details__link}>
						<Link to={`${movieTv.id}`}>
							<h2>{movieTv.tagline}</h2>
							<p>
								{movieTv.overview.length > 50 &&
									`${movieTv.overview.substring(0, 200)} ...`}
							</p>
						</Link>
					</div>
				) : (
					<div className={styles.moviesHome__trailerOfTheDay__details__link}>
						<h2>{movieTv.tagline}</h2>
						<p>{movieTv.overview}</p>
					</div>
				)}
			</div>
			{videoKey && (
				<iframe
					src={`https://www.youtube.com/embed/${videoKey}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title={` ${movieTv.title} youtube`}
				/>
			)}
		</section>
	);
};

export default Banner;
