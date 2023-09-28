import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetailsPage = () => {
	const [movie, setMovie] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const apiKey = "136c8f6b5677429e44585a4d845f7780";

		const fetchMovieDetails = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
				);

				if (!response.ok) {
					throw new Error("Network response issue!");
				}

				const data = await response.json();
				setMovie(data);
			} catch (error) {
				console.error("Error about  fetching movie details:", error);
			}
		};
		fetchMovieDetails();
	}, [id]);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/movie-search-app-login");
	};

	return (
		<div className=" bg-dark m-0 min-vh-100 d-flex flex-column align-items-center">
			{movie ? (
				<div className=" container p-3">
					<div className="row text-white text-center align-items-center  p-2 m-2 w-100 h-auto">
						<div className="details fw-lighter col-12 col-md-6 p-1 ">
							<header>
								<h1 className="text-capitalize ">{movie.title}</h1>
							</header>
							<h4>Overview</h4>
							<p>{movie.overview}</p>
							<h4>Vote Average (Rate):</h4>
							<p>{movie.vote_average}</p>
							<h4>Release Date: </h4>
							<p>{movie.release_date}</p>
							<div className="footer text-center mb-2">
								<button
									className="btn btn-primary w-auto rounded border border-black"
									variant="info"
									onClick={handleLogout}
									// onClick={() => navigate("/movie-search-app-login")}
								>
									Logout
								</button>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt={movie.title}
								className="rounded-circle p-3"
							/>
						</div>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default MovieDetailsPage;
