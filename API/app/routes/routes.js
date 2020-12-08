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

	// not required, shouldn't implement otherwise we will need
	// triggers in the db to delete from other tables
	// app.post("/deleteUser", users.deleteUser);

	app.post("/listAdmins", events.listAdmins);

	app.post("/adminEvents", events.adminEvents);

	// app.post("/listUsers", events.listUsers);

	// app.post("/userEvents", events.userEvents);

	app.put("/approveEvent", events.approveEvent);

	app.post("/createEvent", events.createEvent);

	// not required
	// app.put("/editEvent", events.editEvent);

	app.post("/listSelfEvents", events.listSelfEvents);

	app.get("/eventsByDate/:startdate/:enddate", events.eventsByDate);

	app.get("/eventsByCity/:city", events.eventsByCity);

	app.post("/joinEvent", events.joinEvent);

	// not required
	// app.delete("/leaveEvent", user.leaveEvent);
};
