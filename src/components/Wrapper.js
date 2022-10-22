import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { resetTopRated } from "../redux/features/movieDB/topRatedSlice";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	useLayoutEffect(() => {
		dispatch(resetTopRated());
		// reset redux state for top rated movies / tv shows when re routing
		document.documentElement.scrollTo(0, 0);
		// on route change scroll to top
	}, [location.pathname, dispatch]);
	return children;
};

export default Wrapper;
