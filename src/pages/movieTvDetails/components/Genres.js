import React from "react";
import styles from "../../../Styles/MovieTvDeatils.module.scss";

const Genres = ({ movieTvDetails }) => {
	return (
		<div className={styles.details__genresContainer}>
			<p>Genres</p>
			<div>
				{movieTvDetails.genres.map((genre) => {
					return <span key={genre.id}>{genre.name}</span>;
				})}
			</div>
		</div>
	);
};

export default Genres;
