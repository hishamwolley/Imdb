import React from "react";
import CarouselContainer from "../components/CarouselContainer";
import { useSelector } from "react-redux";

const PopularSection = ({ type }) => {
	const { popular, loadingPopular } = useSelector((state) => state.popular);

	return loadingPopular ? (
		<div style={{ width: "100%", height: "500px" }}></div>
	) : (
		<CarouselContainer type={type} data={popular} />
	);
};

export default PopularSection;
