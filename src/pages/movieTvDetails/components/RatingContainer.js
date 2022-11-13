import React from "react";
import styles from "../../../Styles/MovieTvDeatils.module.scss";
import { checkData } from "../../../helpers/apiCalls";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";
import { ratingNotificationOn } from "../../../redux/features/navigation/navigationSlices";
import { useDispatch } from "react-redux";

const RatingContainer = ({ movieTvDetails, type, id }) => {
	const dispatch = useDispatch();
	return (
		<section className={styles.details__flexContainer2}>
			<div className={styles.details__flexContainer2__rateContainer}>
				<p>Rate me!</p>
				<p>Average Rate {movieTvDetails.vote_average.toFixed(1)}</p>
				<p>Vote Count {movieTvDetails.vote_count}</p>
				<Rating
					onClick={(value) => {
						checkData(value, type, id);
						dispatch(ratingNotificationOn());
					}}
					stop={10}
					fractions={2}
					initialRating={movieTvDetails.vote_average.toFixed(1)}
					emptySymbol={<BsStar color="#f3ce13" />}
					fullSymbol={<BsStarFill color="#f3ce13" />}
				/>
			</div>
		</section>
	);
};

export default RatingContainer;
