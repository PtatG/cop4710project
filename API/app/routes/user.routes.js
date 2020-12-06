// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
module.exports = app => {
	const users = require("../controllers/user.controller.js");

	app.post("/registerUser", users.registerUser);

	app.post("/loginUser", users.loginUser);

	// app.put("/editUser", users.editUser);

	// app.post("/deleteUser", users.deleteUser);

	// app.post("/listAdmins", users.listAdmins);







};
