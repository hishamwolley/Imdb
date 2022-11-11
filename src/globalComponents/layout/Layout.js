import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import CastModal from "../../pages/home/components/CastModal";
import { useSelector } from "react-redux";

const Layout = () => {
	const modal = useSelector((state) => state.navigation.modal);
	return (
		<>
			<Sidebar />
			<Header />
			{modal && <CastModal />}
			<Outlet />
		</>
	);
};

export default Layout;
