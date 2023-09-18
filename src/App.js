import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/movie-search-app" element={<LoginPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/movie-details/:id" element={<MovieDetailsPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LoginPage from "./components/LoginPage";
// import SearchPage from "./components/SearchPage";
// import MovieDetailsPage from "./components/MovieDetailsPage";
// import NoPage from "./components/NoPage";

// const App = () => {
// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path="/" element={<Layout />}>
// 					<Route index element={<LoginPage />} />
// 					<Route path="search" element={<SearchPage />} />
// 					<Route path="movie-details" element={<MovieDetailsPage />} />
// 					<Route path="*" element={<NoPage />} />
// 				</Route>
// 			</Routes>
// 		</BrowserRouter>
// 	);
// };

// export default App;
