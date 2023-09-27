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
		<div className="container main-wrapper text-center">
			{movie ? (
				<div className=" fs-6 fw-lighter border border-black my-3 p-3 ">
					<header>
						<br />
						<h1>
							<strong>{movie.title}</strong>
						</h1>
					</header>
					<h4>Overview</h4>
					<p>{movie.overview}</p>
					<h4>Vote Average (Rate):</h4>
					<p>{movie.vote_average}</p>
					<h4>Release Date: </h4>
					<p>{movie.release_date}</p>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
						alt={movie.title}
						className="rounded "
						style={{
							width: "auto",
							height: "auto",
							margin: "auto",
							border: "7px solid black",
						}}
					/>
					<div className="m-5">
						<button
							className="btn btn-secondary w-50 rounded-pill border border-black"
							variant="info"
							onClick={handleLogout}
							// onClick={() => navigate("/movie-search-app-login")}
						>
							Logout
						</button>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default MovieDetailsPage;
