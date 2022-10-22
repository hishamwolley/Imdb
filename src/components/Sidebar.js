import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "../Styles/Sidebar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
	sidebarOff,
	sidebarOn,
} from "../redux/features/navigation/navigationSlices";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useOutsideAlerter from "../helpers/useOutsideAlerter";
import throttle from "lodash.throttle";

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const sidebar = useSelector((state) => state.navigation.sidebar);
	const wrapperRef = useRef();
	const dispatch = useDispatch();
	const [clickOutsideNavMobile, setClickOutsideNavMobile] = useState(false);

	const switchSidebarOff = () => {
		dispatch(sidebarOff());
	};

	useLayoutEffect(() => {
		if (window.innerWidth >= 768) {
			dispatch(sidebarOn());
		} else {
			setClickOutsideNavMobile(true);
		}

		window.addEventListener(
			"resize",
			throttle(() => {
				if (window.innerWidth < 768) {
					setClickOutsideNavMobile(true);
				} else {
					setClickOutsideNavMobile(false);
				}
			}, 150)
		);

		return () => {
			window.removeEventListener(
				"resize",
				throttle(() => {
					if (window.innerWidth < 768) {
						setClickOutsideNavMobile(true);
					} else {
						setClickOutsideNavMobile(false);
					}
				}, 150)
			);
		};
	}, [dispatch]);

	useOutsideAlerter(wrapperRef, "sidebarOff");
	return (
		<>
			{sidebar ? (
				<section
					ref={clickOutsideNavMobile ? wrapperRef : null}
					className={`${styles.sidebar} ${styles.sidebar__sidebarOn}`}
				>
					<div className={styles.sidebar__sidebarOn__topSection}>
						<button
							className={styles.sidebar__logo}
							onClick={() => {
								if (location.pathname === "/") {
									window.location.reload();
								} else {
									navigate("/");
								}
							}}
						>
							IMDB
						</button>
						<AiOutlineClose
							onClick={switchSidebarOff}
							className={styles.sidebar__sidebarOn__topSection__close}
							color="#fff"
						/>
					</div>
					<div className={styles.sidebar__genresContainer}>
						<h3>Genres</h3>
						<ul>
							<li>
								<Link to="/">Action</Link>
							</li>
							<li>
								<Link to="/">Comedy</Link>
							</li>{" "}
							<li>
								<Link to="/">Adventure</Link>
							</li>{" "}
							<li>
								<Link to="/">Horror</Link>
							</li>
						</ul>
					</div>
				</section>
			) : (
				<section className={styles.sidebar}></section>
			)}
		</>
	);
};

export default Sidebar;
