import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useOutsideAlerter from "../helpers/useOutsideAlerter";
import { searchResultOff } from "../redux/features/navigation/navigationSlices.js";

const SearchResultContainer = () => {
	const wrapperRef = useRef();
	const dispatch = useDispatch();

	const { searchResult, loadingSearchResult } = useSelector(
		(state) => state.searchResult
	);

	useOutsideAlerter(wrapperRef, "searchResultOff");

	return (
		<div
			ref={wrapperRef}
			style={{
				top: "45px",
				position: "absolute",
				width: "100%",
				height: "160px",
				background: "white",
				overflowY: "scroll",
			}}
		>
			{!loadingSearchResult && (
				<div style={{ color: "black" }}>
					{searchResult.length < 1 ? (
						<p style={{ textAlign: "center", paddingTop: "2rem" }}>
							No Results Found
						</p>
					) : (
						searchResult.slice(0, 20).map((result) => {
							return (
								<div
									key={result.id}
									style={{
										position: "relative",
										padding: "1rem 0",
										fontSize: "small",
										background: "whitesmoke",
										display: "flex",
										alignItems: "center",
										width: "100%",
									}}
								>
									<Link
										onClick={() => {
											dispatch(searchResultOff());
										}}
										style={{ width: "100%", paddingLeft: "1rem" }}
										to={`/${result.id}`}
									>
										{result.title}
									</Link>
								</div>
							);
						})
					)}
				</div>
			)}
		</div>
	);
};

export default SearchResultContainer;
