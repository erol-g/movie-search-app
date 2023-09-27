import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import "./App.css";

// const getMovies = async () => {
// 	try {
// 		const apiKey = "136c8f6b5677429e44585a4d845f7780";
// 		fetch(`https://api.themoviedb.org/3/movie/550&api_key=${apiKey}`)
// 			.then((res) => res.json())
// 			.then((data) => data.result);
// 	} catch (error) {
// 		console.error("Error fetching search results:", error);
// 	}
// };
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/movie-search-app-login" element={<LoginPage />} />
				<Route path="/search-page" element={<SearchPage />} />
				<Route path="/movie-details/:id" element={<MovieDetailsPage />} />
				<Route
					path="*"
					element={<Navigate to="/movie-search-app-login" />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
