import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Nav(props) {
	const navStyle = {
		color: 'white'
	};
	
	if(props.user == undefined)
		return <GuestLinks />
	else if(props.user.level == 2)
		return <SuperLinks logout={props.logout}/>
		
	return <UserLinks  logout={props.logout}/>
}

function UserLinks(props) {
	const navStyle = {
		color: 'white'
	};
	
	return (
		<nav className="navClass">
			<ul className="nav-links">
				<Link style={navStyle} to="/">
					<li>Home</li>
				</Link>
				<Link style={navStyle} to="/host">
					<li>Host</li>
				</Link>
				<Link style={navStyle} to="/search">
					<li>Search</li>
				</Link>
				<Link style={navStyle} to="/user">
					<li>My Events</li>
				</Link>
				<a onClick={props.logout} href="#!">
					<li>Logout</li>
				</a>
			</ul>
		</nav>
	)
}

function SuperLinks(props) {
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
				<Link style={navStyle} to="/user">
					<li>My Events</li>
				</Link>
				<a onClick={props.logout} href="#!">
					<li>Logout</li>
				</a>
			</ul>
		</nav>
	)
}

function GuestLinks(props) {
	const navStyle = {
		color: 'white'
	};
	
	return (
		<nav className="navClass">
			<ul className="nav-links">
				<Link style={navStyle} to="/">
					<li>Home</li>
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

const logout = () => {
	if(window.confirm("Are you sure you want to logout?"))
		return {type: "LOGOUT"}
	return {type: ""}
}

export default connect(mapState, {logout})(Nav);