// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const sql = require("./db.js");

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

Event.eventsByDate = (dates, result) => {
	sql.query(`SELECT * FROM events WHERE startdate >= '${dates.startdate}'
						AND enddate <= '${dates.enddate}'`, (err, res) => {
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
	sql.query(`SELECT * FROM events WHERE city = '${city}'`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res);
		}
		return result({err: "Event not found."}, null);
	});
};

module.exports = Event;
