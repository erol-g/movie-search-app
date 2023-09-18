import React, { useState } from "react";
import {
	Container,
	Row,
	Form,
	Button,
	Spinner,
	Alert,
	Card,
	Col,
} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
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

	const handleKeydown = (e) => {
		return (e.Keydown = "Enter"
			? handleSearch
			: Alert("No result, try again please!"));
	};

	const viewMovieDetails = (id) => {
		navigate(`/movie-details/${id}`);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/movie-search-app");
	};

	return (
		<Container fluid>
			<h1 style={{ textAlign: "center" }}>
				MOVIE SEARCH APP WITH REACT.JS
				<br />
			</h1>
			<hr />
			<Form>
				<Form.Group controlId="searchInput">
					<Form.Label>SEARCH BAR</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						placeholder=""
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeydown={handleKeydown}
					/>
				</Form.Group>

				<div className="mb-2 " size="lg">
					<Button variant="primary" onClick={handleSearch}>
						Search for a movie ...
					</Button>
				</div>
				<hr />
			</Form>

			{loading ? (
				<Button variant="primary" disabled>
					<Spinner
						as="span"
						animation="grow"
						size="lg"
						role="status"
						aria-hidden="true"
					/>
					Loading...
				</Button>
			) : (
				<Row>
					{searchResults.map((result, index) => (
						<Col key={index}>
							<CardGroup>
								<Card
									key={result.id}
									onClick={() => viewMovieDetails(result.id)}
								>
									<Card.Body>
										<Card.Header>
											<Card.Title>
												<h2>{result.title}</h2>
											</Card.Title>
										</Card.Header>
										<Card.Title>
											<p>{result.release_date}</p>
										</Card.Title>
									</Card.Body>

									<Card.Img
										variant="bottom"
										alt="Card Image"
										src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
										style={{ width: "300px", height: "400px" }}
									/>
									<hr />
									<hr />
								</Card>
							</CardGroup>
						</Col>
					))}
				</Row>
			)}
			<div className="d-grid gap-2">
				<Button variant="info" onClick={handleLogout} size="lg">
					Logout
				</Button>
			</div>
		</Container>
	);
};

export default SearchPage;
