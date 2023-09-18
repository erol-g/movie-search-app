import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
		// window.location.reload();
		navigate("/");
	};

	return (
		<Container
			style={{
				border: "60px solid black",
				backgroundColor: "white",
				height: "66%",
				textAlign: "center",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{movie ? (
				<div>
					<div
						style={{
							backgroundColor: "grey",
							color: "gold",
							padding: "15px",
							border: "3px dotted black",
						}}
					>
						<h1>MOVIE DETAILS PAGE</h1>
					</div>
					<h1>{movie.title}</h1>
					<Row style={{ padding: "10px" }}>
						<Col md={5}>
							<h3>Overview</h3>
							<p>{movie.overview}</p>
							<h3>Vote Average (Rate):</h3>
							<p>{movie.vote_average}</p>
							<h3>Release Date: </h3>
							<p>{movie.release_date}</p>
						</Col>
						<Col>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt={movie.title}
							/>
						</Col>
					</Row>
					<div className="d-grid gap-2">
						<Button variant="info" onClick={handleLogout} size="lg">
							Logout
						</Button>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</Container>
	);
};

export default MovieDetailsPage;
