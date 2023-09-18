import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";
import SearchPage from "./SearchPage";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = () => {
		if (password.length > 6 && !email === false) {
			localStorage.setItem("email", email);
			localStorage.setItem("password", password);
			setLoggedIn(true);
		} else {
			alert("Try again, please!!!");
		}
	};

	return (
		<>
			{loggedIn ? (
				<SearchPage />
			) : (
				<div className=" wrapper bg-dark d-flex align-items-center justify-content-center w-100">
					<div className="login ">
						<h2 className="mb-3">Login Page</h2>
						<form className="needs-validation">
							<div className="form-group  was-validated mb-2">
								<label htmlFor="email" className="form-label">
									Email:
								</label>
								<input
									required
									className="form-control"
									type="email"
									value={email}
									placeholder="example@example.com"
									onChange={(e) => setEmail(e.target.value)}
									autoFocus
								/>
								<div className="invalid-feedback">
									Please, enter your correct email !
								</div>
							</div>
							<div className="form-group was-validated mb-2">
								<label htmlFor="password" className="form-label">
									Password:
								</label>
								<input
									required
									className="form-control"
									type="password"
									value={password}
									placeholder="*******"
									minLength={7}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="invalid-feedback">
									Please, enter your correct password, it should be more than
									six characters !
								</div>
							</div>
							<button
								className="btn btn-success w-100 mt-2"
								type="submit"
								onClick={handleLogin}
							>
								Login
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default LoginPage;
