import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
	const navStyle = {
		color: 'white'
	};
	
	return <UserLink />
}

function UserLink() {
	const navStyle = {
		color: 'white'
	};
	
	return (
		<nav className="navClass">
			<ul className="nav-links">
				<Link style={navStyle} to="/">
					<li>Home</li>
				</Link>
				<Link style={navStyle} to="/lookup">
					<li>Lookup</li>
				</Link>
				<Link style={navStyle} to="/host">
					<li>Host</li>
				</Link>
				<Link style={navStyle} to="/search">
					<li>Search</li>
				</Link>
				<Link style={navStyle} to="/login">
					<li>Login</li>
				</Link>
				<Link style={navStyle} to="/register">
					<li>Register</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Nav;