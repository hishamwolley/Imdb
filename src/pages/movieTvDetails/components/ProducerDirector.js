import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../Styles/MovieTvDeatils.module.scss";

const ProducerDirector = ({ type }) => {
	const { credits, loadingCredits } = useSelector((state) => state.credits);

	let producerDirector =
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
	return (
		!loadingCredits && (
			<div className={styles.details__directorContainer}>
				<p>{producerDirector}</p>
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
		)
	);
};

export default ProducerDirector;
