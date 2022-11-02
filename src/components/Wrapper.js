import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	useLayoutEffect(() => {
		document.documentElement.scrollTo(0, 0);
		// on route change scroll to top
	}, [location.pathname, dispatch]);
	return children;
};

export default Wrapper;
