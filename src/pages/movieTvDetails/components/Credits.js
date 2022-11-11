import React, { useEffect } from "react";
import styles from "../../../Styles/MovieTvDeatils.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/features/navigation/navigationSlices";
import { getCredits } from "../../../redux/features/movieDB/creditsSlice";

const Credits = ({ type, id }) => {
	const dispatch = useDispatch();
	const { credits, loadingCredits } = useSelector((state) => state.credits);

	useEffect(() => {
		dispatch(getCredits({ type: type, id: id }));
	}, [id, type, dispatch]);
	return (
		!loadingCredits && (
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
		)
	);
};

export default Credits;
