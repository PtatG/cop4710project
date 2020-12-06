// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const User = require("../models/user.model.js");
const jwt = require("../jwt/jwtFunction.js");
const bcrypt = require("bcryptjs");

// create and save a new user
// required inputs: username and password
// outputs: username and message
exports.registerUser = (req, res) => {
	// check required fields
	if (!req.body.username) {
		return res.status(400).json({
			message: "Username required."
		});
	}
	if (!req.body.password) {
		return res.status(400).json({
			message: "Password required."
		});
	}

	const user = new User({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name,
		email: req.body.email,
		city: req.body.city
	});

	user.password = bcrypt.hashSync(user.password, 10);

	User.registerUser(user, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Could not register user."
			});
		}
		res.json({
			username: data.username,
			message: "User " + data.username + " registered successfully!"
		});
	});
}; // end registerUser

// login user
// required inputs: username and password
// outputs: token, username, email, name, city, and message
exports.loginUser = (req, res) => {
	// check required fields
	if (!req.body.username) {
		return res.status(400).json({
			message: "Username required."
		});
	}
	if (!req.body.password) {
		return res.status(400).json({
			message: "Password required."
		});
	}

	// find user based on username
	User.loginUser(req.body.username, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Could not find user."
			});
		}
		// check password
		if (!bcrypt.compareSync(req.body.password, data.password)) {
			return res.status(401).json({
				message: "Incorrect password."
			});
		}

		let payload = {userId: data.id,};
		let token = jwt.sign(payload);

		res.json({
			token: token,
			username: data.username,
			name: data.name,
			email: data.email,
			city: data.city,
			message: "User " + data.username + " login successful."
		});
	});
}; // end loginUser
