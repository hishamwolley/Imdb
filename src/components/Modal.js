import React from "react";
import styles from "../Styles/Modal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { toggleModal } from "../redux/features/navigation/navigationSlices";

const Modal = () => {
	const { credits, loadingCredits } = useSelector((state) => state.credits);
	const dispatch = useDispatch();

	return (
		<div className={styles.modal}>
			<div className={styles.modal__close}>
				<AiOutlineClose
					onClick={() => {
						dispatch(toggleModal());
					}}
				/>
				<div className={styles.modal__columnsTitle}>
					<span>name</span>
					<span>Character</span>
					<span>Image</span>
				</div>
			</div>

			{!loadingCredits &&
				credits.cast.map((c) => {
					console.log(c);
					return (
						<div className={styles.modal__resultContainer} key={c.id}>
							<span>{c.name}</span>
							<span>{c.character}</span>

							<span>
								{c.profile_path && (
									<img
										src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
										alt={c.name}
									/>
								)}
							</span>
						</div>
					);
				})}
		</div>
	);
};

export default Modal;
