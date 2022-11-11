import React from "react";
import { Link } from "react-router-dom";

const TopRatedMovieTvPost = React.forwardRef(
	({ movieTv, styles, type }, ref) => {
		let title =
			type === "movie"
				? movieTv.title
				: type === "tv"
				? movieTv.original_name
				: null;
		return (
			<Link to={`${movieTv.id}`}>
				<div
					ref={ref ? ref : null}
					className={styles.moviesHome__topRatedMovies__movieContainer}
				>
					<div
						className={
							styles.moviesHome__topRatedMovies__movieContainer__movieImage
						}
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieTv.poster_path})`,
						}}
					>
						<span>{movieTv.vote_average}</span>
					</div>
					<p>{title}</p>
				</div>
			</Link>
		);
	}
);

export default TopRatedMovieTvPost;
