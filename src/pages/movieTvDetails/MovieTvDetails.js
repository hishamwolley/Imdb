import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSimilar } from "../../redux/features/movieDB/similarSlice";
import CarouselContainer from "../../globalComponents/CarouselContainer";
import styles from "../../Styles/MovieTvDeatils.module.scss";
import BannerMovieTv from "./components/BannerMovieTv";
import MovieTvData from "./components/MovieTvData";
import Notification from "../../globalComponents/Notification";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const TvMovieDetails = ({ type }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { similar, loadingSimilar } = useSelector((state) => state.similar);
	const ratingNotification = useSelector(
		(state) => state.navigation.ratingNotification
	);

	useEffect(() => {
		dispatch(getSimilar({ type: type, id: id }));
	}, [id, type, dispatch]);

	return (
		<div className={styles.banner}>
			{ratingNotification && (
				<Notification>
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						Rated Successfully
						<IoMdCheckmarkCircleOutline
							color="green"
							style={{ marginLeft: ".15rem" }}
						/>
					</div>
				</Notification>
			)}
			<BannerMovieTv type={type} />
			<MovieTvData type={type} id={id} />
			<h3 className={styles.similar}>Similar</h3>
			{!loadingSimilar && <CarouselContainer type={type} data={similar} />}
		</div>
	);
};

export default TvMovieDetails;
