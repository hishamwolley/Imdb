import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ratingNotificationOff } from "../redux/features/navigation/navigationSlices";

const Notification = ({ children }) => {
	const dispatch = useDispatch();
	const ratingNotification = useSelector(
		(state) => state.navigation.ratingNotification
	);
	useEffect(() => {
		if (ratingNotification) {
			setTimeout(() => {
				dispatch(ratingNotificationOff());
			}, 3000);
		}
	}, [ratingNotification, dispatch]);
	return (
		<div
			style={{
				padding: "0 1rem",
				height: "30px",
				background: "white",
				color: "black",
				position: "fixed",
				top: "60px",
				zIndex: "5",
				left: "50%",
				transform: "translate(-50%, 0%)",
			}}
		>
			{children}
		</div>
	);
};

export default Notification;
