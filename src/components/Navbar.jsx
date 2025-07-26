import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-light"><i className="fa-solid fa-jedi"></i></span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-light">Favorites</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};