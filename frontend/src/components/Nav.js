import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Nav(props) {
	const navStyle = {
		color: 'white'
	};
	
	return <UserLink user={props.user} />
}

function UserLink(props) {
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

const mapState = state => ({
	user: state.user
})

export default connect(mapState)(Nav);