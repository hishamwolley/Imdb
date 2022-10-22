import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	searchResultOff,
	sidebarOff,
} from "../redux/features/navigation/navigationSlices";

const useOutsideAlerter = (ref, stateFunction) => {
	const dispatch = useDispatch();
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				// alert("You clicked outside of me!");
				if (stateFunction === "sidebarOff") {
					dispatch(sidebarOff());
				}

				if (stateFunction === "searchResultOff") {
					dispatch(searchResultOff());
				}
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, stateFunction, dispatch]);
};

export default useOutsideAlerter;
