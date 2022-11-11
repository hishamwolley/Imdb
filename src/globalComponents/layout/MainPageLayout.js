import React from "react";
import { useSelector } from "react-redux";
import styles from "../../Styles/MainPageLayout.module.scss";

const MainPageLayout = ({ childComponent }) => {
	const sidebar = useSelector((state) => state.navigation.sidebar);

	return (
		<main
			className={`${styles.mainContainer} ${
				sidebar && styles.mainContainer__pushRight
			}`}
		>
			{childComponent}
		</main>
	);
};

export default MainPageLayout;
