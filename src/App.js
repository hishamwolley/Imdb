import { Routes, Route } from "react-router-dom";
import "./Styles/Body.scss";
import Home from "./pages/home/Home";
import Charts from "./pages/Charts";
import Layout from "./globalComponents/layout/Layout";
import MainPageLayout from "./globalComponents/layout/MainPageLayout";
import MovieTvDetails from "./pages/movieTvDetails/MovieTvDetails";
import Wrapper from "./globalComponents/Wrapper";
function App() {
	return (
		<Wrapper>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/">
						<Route
							index={true}
							element={
								<MainPageLayout childComponent={<Home type="movie" />} />
							}
						/>
						<Route
							index={false}
							path=":id"
							element={
								<MainPageLayout
									childComponent={<MovieTvDetails type={"movie"} />}
								/>
							}
						/>
					</Route>
					<Route path="/tv">
						<Route
							index={true}
							element={<MainPageLayout childComponent={<Home type="tv" />} />}
						/>
						<Route
							index={false}
							path=":id"
							element={
								<MainPageLayout
									childComponent={<MovieTvDetails type={"tv"} />}
								/>
							}
						/>
					</Route>
					<Route path="/charts">
						<Route
							index={true}
							element={<MainPageLayout childComponent={<Charts />} />}
						/>
					</Route>
					<Route
						path="*"
						element={<MainPageLayout childComponent={<Home />} />}
					/>
				</Route>
			</Routes>
		</Wrapper>
	);
}

export default App;
