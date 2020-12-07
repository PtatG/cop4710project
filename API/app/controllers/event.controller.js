// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const Event = require("../models/event.model.js");
const Participant = require("../models/participant.model.js");
const jwt = require("../jwt/jwtFunction.js");

// approve an event
// required input: token, eventid, and level
// output: message
exports.approveEvent = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}
	if (!req.body.eventid) {
		return res.status(400).json({
			message: "Event ID required."
		});
	}
	if (!req.body.level) {
		return res.status(400).json({
			message: "User level required."
		});
	}
	if (req.body.level != 2) {
		return res.status(401).json({
			message: "User needs to be a Super Admin to approve events."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	Event.approveEvent(req.body.eventid, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't approve event."
			});
		}
		res.json({
			message: "Event successfully approved!"
		});
	});
}; // end approveEvent

// create new event
// required input: token and title
// output: eventid, title, and message
exports.createEvent = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}
	if (!req.body.title) {
		return res.status(400).json({
			message: "Event title required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
  }
  else {
    return res.status(401).json({
      message: "Token could not be verified."
    });
  }

	const events = new Event({
		title: req.body.title,
		description: req.body.description,
		url: req.body.url,
		startdate: req.body.startdate,
		enddate: req.body.enddate,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zipcode: req.body.zipcode,
		organizer: userId,
		active: false
	});

	Event.createEvent(events, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't create event."
			});
		}
		res.json({
			eventid: data.eventid,
			title: data.title,
			message: "Created event " + data.title + " successfully!"
		});
	});
}; // end createEvent

// list all events this admin has created
// required input: token and level
// output: events array and message
exports.listSelfEvents = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}
	if (!req.body.level) {
		return res.status(400).json({
			message: "User level required."
		});
	}
	if (req.body.level == 0) {
		return res.status(401).json({
			message: "This user has not created any events."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
  }
  else {
    return res.status(401).json({
      message: "Token could not be verified."
    });
  }

	Event.listSelfEvents(userId, (err, data) => {
		if (err) {
			return res.status(404).json({
				message: "Error: Couldn't find events."
			});
		}
		res.json({
			events: data,
			message: "Got events successfully!"
		});
	});
}; // end listSelfEvents

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

// join an event
// required input: token, eventid, and title
// output: message
exports.joinEvent = (req, res) => {
	// check required field
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}
	if (!req.body.eventid) {
		return res.status(400).json({
			message: "eventid required."
		});
	}
	if (!req.body.title) {
		return res.status(400).json({
			message: "Event title required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
  }
  else {
    return res.status(401).json({
      message: "Token could not be verified."
    });
  }

	const participants = new Participant({
		eventid: req.body.eventid,
		userid: userId
	});

	Event.joinEvent(participants, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't join event."
			});
		}
		res.json({
			message: "Joined event " + req.body.title + " successfully!"
		});
	});
}; // end joinEvent
