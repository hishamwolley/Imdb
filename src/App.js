import { Routes, Route } from "react-router-dom";
import "./Styles/Body.scss";
import Home from "./pages/Home";
import Charts from "./pages/Charts";
import Layout from "./components/layout/Layout";
import MainPageLayout from "./components/layout/MainPageLayout";
import MovieTvDetails from "./pages/MovieTvDetails";
import Wrapper from "./components/Wrapper";
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
