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
		<div className=" d-flex flex-column align-items-center  min-vh-100 text-center bg-dark text-white p-3 main-wrapper">
			<header className="w-100 text-center ">
				<h1 className="m-3 text-center">MOVIE SEARCH APP</h1>
				<div className="col m-5 text-center align-items-center">
					<div className="input-group  w-50  text-center m-auto">
						<input
							autoFocus
							type="text"
							value={searchInput}
							className="form-control max-vh-50 text-center"
							placeholder="Type a movie name, please!"
							aria-label="Search Input"
							aria-describedby="button-addon2"
							required
							onChange={(e) => setSearchInput(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<button
							className="btn btn-outline-secondary w-auto text-center"
							type="submit"
							id="button-addon2"
							onClick={handleSearch}
						>
							Search
						</button>
					</div>
				</div>

				<hr className="border border-light border-3 opacity-50" />
				{loading ? (
					<div>
						<div className="spinner-grow" role="status">
							<span className="visible m-2 p-5">Loading...</span>
						</div>
						{/* {searchResults.length === 0 && alert("Please, try again !!")} */}
					</div>
				) : (
					<div className="container ">
						<div className="row ">
							{searchResults.map((result) => (
								<div className="col-12 col-sm-6 col-md-3 col-lg-3 my-2">
									<div
										className="search-result border border-black border-5 "
										key={result.id}
										onClick={() => viewMovieDetails(result.id)}
										id="search-result"
									>
										<div
											className="result"
											style={{ width: "100%", height: "300px" }}
										>
											<img
												variant="bottom"
												alt="alt"
												src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
												className="rounded"
												style={{ width: "100%", height: "300px" }}
											></img>
										</div>
										<div className="text-white bg-dark p-2">
											<p className="text-capitalize">
												<span>
													<strong>{result.title}</strong>
												</span>
											</p>
										</div>
										<div className="text-white bg-dark ">
											<p>{result.release_date}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</header>
			<div className="footer mt-auto">
				<button
					className="btn btn-primary border border-black b-5 m-auto"
					//onClick={() => navigate("/movie-search-app-login")}
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default SearchPage;
