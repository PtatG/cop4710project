// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const sql = require("./db.js");

// Event constructor
const Event = function(events) {
	this.title = events.title;
	this.description = events.description;
	this.url = events.url;
	this.startdate = events.startdate;
	this.enddate = events.enddate;
	this.address = events.address;
	this.city = events.city;
	this.state = events.state;
	this.zipcode = events.zipcode;
	this.organizer = events.organizer;
	this.active = events.active;
};

Event.listAdmins = (id, result) => {
	sql.query(`SELECT DISTINCT users.id, users.username
						 FROM users INNER JOIN events
						 ON users.id = events.organizer
						 ORDER BY users.id`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Admins not found."}, null);
	});
};

Event.adminEvents = (id, result) => {
	sql.query(`SELECT * FROM events WHERE organizer = '${id}'
						 ORDER BY eventid`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Events not found."}, null);
	});
};

Event.listUsers = (id, result) => {
	sql.query(`SELECT id, username FROM users ORDER BY id`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Users not found."}, null);
	});
};

Event.userEvents = (id, result) => {
	sql.query(`SELECT events.title
						 FROM events INNER JOIN participants
						 ON events.eventid = participants.eventid
						 AND participants.userid = '${id}'
						 ORDER BY events.eventid`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Events not found."}, null);
	});
};

Event.approveEvent = (id, result) => {
	sql.query(`UPDATE events SET active = 1 WHERE eventid = '${id}'`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		return result(null, {res: "Set active."});
	});
};

Event.createEvent = (newEvent, result) => {
	sql.query("INSERT INTO events SET ?", newEvent, (err, res) => {
		if (err) {
			return result(err, null);
		}
		return result(null, {title: res.title, ...newEvent});
	});
};

Event.listSelfEvents = (id, result) => {
	sql.query(`SELECT * FROM events WHERE organizer = '${id}'
						 ORDER BY eventid`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Event not found."}, null);
	});
};

Event.listOneEvent = (eventid, result) => {
	sql.query(`SELECT * FROM events WHERE eventid = '${eventid}'`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res[0]);
		}
		return result({err: "Event not found."}, null);
	});
};

Event.eventsByDate = (dates, result) => {
	sql.query(`SELECT * FROM events WHERE startdate >= '${dates.startdate}'
						AND enddate <= '${dates.enddate}' ORDER BY eventid`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Event not found."}, null);
	});
};

Event.eventsByCity = (city, result) => {
	sql.query(`SELECT * FROM events WHERE city = '${city}'
						 ORDER BY eventid`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Event not found."}, null);
	});
};

Event.joinEvent = (joinEvent, result) => {
	sql.query("INSERT INTO participants SET ?", joinEvent, (err, res) => {
		if (err) {
			return result(err, null);
		}
		return result(null, {res: "Joined event."});
	});
};

Event.leaveEvent = (eventid, userid, result) => {
	sql.query(`DELETE FROM participants WHERE eventid = ? AND userid = ?`,
						 [eventid, userid], (err, res) => {
		if (err) {
			return result(err, null);
		}
		return result(null, res);
	});
};

module.exports = Event;
