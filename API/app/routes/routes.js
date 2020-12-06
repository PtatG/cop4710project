// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
module.exports = app => {
	const users = require("../controllers/user.controller.js");
	const events = require("../controllers/event.controller.js");

	app.post("/registerUser", users.registerUser);

	app.post("/loginUser", users.loginUser);

	// not required
	// app.put("/editUser", users.editUser);

	// not required
	// app.post("/deleteUser", users.deleteUser);

	// app.post("/listAdmins", super.listAdmins);

	// app.post("/adminEvents", super.adminEvents);

	// app.post("/listUsers", super.listUsers);

	// app.post("/userEvents", super.userEvents);

	// app.put("/approveEvent", super.approveEvent);

	// app.post("/createEvent", events.createEvent);

	// not required
	// app.put("/editEvent", events.editEvent);

	// app.post("/listSelfEvents", events.listSelfEvents);

	app.get("/eventsByDate", events.eventsByDate);

	app.get("/eventsByCity", events.eventsByCity);

	// app.post("/joinEvent", user.joinEvent);

	// not required
	// app.delete("/leaveEvent", user.leaveEvent);
};
