import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Modal from "../Modal";
import { useSelector } from "react-redux";

const Layout = () => {
	const modal = useSelector((state) => state.navigation.modal);
	return (
		<>
			<Sidebar />
			<Header />
			{modal && <Modal />}
			<Outlet />
		</>
	);
};

export default Layout;
