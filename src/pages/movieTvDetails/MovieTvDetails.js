import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSimilar } from "../../redux/features/movieDB/similarSlice";
import CarouselContainer from "../../globalComponents/CarouselContainer";
import styles from "../../Styles/MovieTvDeatils.module.scss";
import BannerMovieTv from "./components/BannerMovieTv";
import MovieTvData from "./components/MovieTvData";

const TvMovieDetails = ({ type }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { similar, loadingSimilar } = useSelector((state) => state.similar);

	useEffect(() => {
		dispatch(getSimilar({ type: type, id: id }));
	}, [id, type, dispatch]);

	return (
		<div className={styles.banner}>
			<BannerMovieTv type={type} />
			<MovieTvData type={type} id={id} />
			<h3 className={styles.similar}>Similar</h3>
			{!loadingSimilar && <CarouselContainer type={type} data={similar} />}
		</div>
	);
};

export default TvMovieDetails;
