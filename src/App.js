import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import "./App.css";

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
