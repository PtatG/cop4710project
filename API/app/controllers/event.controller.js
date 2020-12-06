// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const Event = require("../models/event.model.js");
const jwt = require("../jwt/jwtFunction.js");

// get events between start and end dates
// required inputs: startdate and enddate
// outputs: events array and message
exports.eventsByDate = (req, res) => {
	// check required fields
	if (!req.body.startdate) {
		return res.status(400).json({
			message: "Start date required."
		});
	}
	if (!req.body.enddate) {
		return res.status(400).json({
			message: "End date required."
		});
	}

	const events = new Event({
		startdate: req.body.startdate,
		enddate: req.body.enddate
	});

	Event.eventsByDate(events, (err, data) => {
		if (err) {
			return res.status(404).json({
				message: "Error: Couldn't find events by dates."
			});
		}
		res.json({
			events: data,
			message: "Got events successfully!"
		});
	});
}; // end eventsByDate

// get events with same city
// required input: city
// outputs: events array and message
exports.eventsByCity = (req, res) => {
	// check required field
	if (!req.body.city) {
		return res.status(400).json({
			message: "City required."
		});
	}

	Event.eventsByCity(req.body.city, (err, data) => {
		if (err) {
			return res.status(404).json({
				message: "Error: Couldn't find events by city."
			});
		}
		res.json({
			events: data,
			message: "Got events successfully!"
		});
	});
}; // end eventsByCity
