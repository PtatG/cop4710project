// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
module.exports = app => {
	const users = require("../controllers/user.controller.js");

	// register a new user
	app.post("/registerUser", users.registerUser);

	// login user
	app.post("/loginUser", users.loginUser);
};
