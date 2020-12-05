import React from "react";
import {Link} from 'react-router-dom';

function Navbar() {
	var navStyle = {
		width: "100%",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		borderBottom: "2px solid black",
		position: "fixed",
		zIndex: "1",
		top: "0"
	}
	return (
		<nav style={navStyle}>
			<h1>
				<Link to="/">Home</Link>
			</h1>
			<p>
				<Link to="/register">Register</Link>
			</p>
		</nav>
	)
}

export default Navbar;