import React from "react";
import Carousel from "react-multi-carousel";
import styles from "../Styles/Carousel.module.scss";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const CarouselContainer = ({ data, type }) => {
	const responsive = {
		xxl: {
			breakpoint: { max: 4000, min: 1280 },
			items: 4,
		},
		xl: {
			breakpoint: { max: 1280, min: 1024 },
			items: 3,
		},
		lg: {
			breakpoint: { max: 1024, min: 768 },
			items: 2,
		},
		md: {
			breakpoint: { max: 768, min: 464 },
			items: 2,
		},
		sm: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};
	return (
		<Carousel
			customButtonGroup={<ButtonGroup />}
			autoPlay={true}
			arrows={false}
			draggable={false}
			responsive={responsive}
			containerClass={styles.carousel}
			itemClass={styles.itemClass}
		>
			{data.results.map((d) => {
				let title =
					type === "movie" ? d.title : type === "tv" ? d.original_name : null;
				return (
					<Link
						key={d.id}
						to={`${type === "movie" ? "/" : type === "tv" ? "/tv/" : null}${
							d.id
						}`}
					>
						<section className={styles.itemClass__imgContainer}>
							<img
								src={`https://image.tmdb.org/t/p/original/${d.poster_path}`}
								alt=".."
							/>
							<div className={styles.itemClass__imgContainer__rating}>
								{d.vote_average.toFixed(1)}
							</div>
							<div className={styles.itemClass__imgContainer__description}>
								{title}
								<p>{d.overview}</p>
							</div>
						</section>
					</Link>
				);
			})}
		</Carousel>
	);
};

const ButtonGroup = ({ next, previous, carouselState }) => {
	const { totalItems, currentSlide, slidesToShow } = carouselState;

	return (
		<div className="carousel-button-group">
			<div
				className={
					currentSlide === 0
						? `disable ${styles.buttonGroup__disabled}`
						: `${styles.buttonGroup} ${styles.buttonGroup__left}`
				}
				onClick={() => previous()}
			>
				<BiChevronLeft className={styles.buttonGroup__icon} />
			</div>
			<div
				className={
					currentSlide === totalItems - slidesToShow
						? `disable ${styles.buttonGroup__disabled}`
						: `${styles.buttonGroup} ${styles.buttonGroup__right}`
				}
				onClick={() => next()}
			>
				<BiChevronRight className={styles.buttonGroup__icon} />
			</div>
		</div>
	);
};

export default CarouselContainer;
