import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();

	const handleSearch = async () => {
		if (searchInput) {
			setLoading(true);

			try {
				const apiKey = "136c8f6b5677429e44585a4d845f7780";

				const response = await fetch(
					`https://api.themoviedb.org/3/search/multi?query=${searchInput}&api_key=${apiKey}`,
				);
				const data = await response.json();
				setSearchResults(data.results);
				setSearchInput("");
			} catch (error) {
				console.error("Error fetching search results:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleKeyDown = (e) => {
		e.key === "Enter" && handleSearch(e.target.value);
	};

	const viewMovieDetails = (id) => {
		navigate(`/movie-details/${id}`);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/movie-search-app-login");
	};

	return (
		<div className=" d-flex flex-column align-items-center w-100 min-vh-100 text-center ">
			<header>
				<h1 className="f">MOVIE SEARCH APP WITH REACT.JS</h1>
				<div className="col">
					<h3>Search Bar</h3>
					<div className="input-group mb-3">
						<input
							autoFocus
							type="text"
							value={searchInput}
							className="form-control"
							placeholder="Type a movie name, please!"
							aria-label="Search Input"
							aria-describedby="button-addon2"
							required
							onChange={(e) => setSearchInput(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<button
							className="btn btn-outline-secondary"
							type="submit"
							id="button-addon2"
							onClick={handleSearch}
						>
							Search
						</button>
					</div>
				</div>
				<br />
				<hr className="border border-primary border-3 opacity-25" />
				{loading ? (
					<div>
						<div className="spinner-grow" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : (
					<div className="container ">
						<div className="row">
							{searchResults.map((result) => (
								<div
									className="col-12 col-sm-6 col-md-3 col-lg-3 my-3 p-3  "
									style={{
										width: "auto",
										height: "auto",
										border: "4px solid black",
										margin: "auto",
									}}
									key={result.id}
									onClick={() => viewMovieDetails(result.id)}
								>
									<h4 className="btn btn-outline-info btn-sm">
										<strong>{result.title}</strong>
									</h4>

									<p>{result.release_date}</p>
									<div>
										<img
											variant="bottom"
											alt="alt"
											src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
											className="col-md-6 float-md mb ms-md rounded"
										></img>
									</div>
									<hr />
								</div>
							))}
							<div className="m-auto">
								<button
									className="btn btn-secondary border border-black w-50"
									//onClick={() => navigate("/movie-search-app-login")}
									onClick={handleLogout}
									style={{
										marginTop: "20%",
										marginBottom: "5%",
									}}
								>
									Logout
								</button>
							</div>
						</div>
					</div>
				)}
			</header>
		</div>
	);
};

export default SearchPage;
