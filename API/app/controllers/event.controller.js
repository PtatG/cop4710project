// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const Event = require("../models/event.model.js");
const Participant = require("../models/participant.model.js");
const jwt = require("../jwt/jwtFunction.js");

// Super Admin lists all admins/organizers
// required input: token
// output: admins array and message
exports.listAdmins = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// check user permission level
	if (level != 2) {
		return res.status(401).json({
			message: "User needs to be a Super Admin to list admins."
		});
	}

	Event.listAdmins(userId, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't list admins."
			});
		}
		res.json({
			admins: data,
			message: "Admins successfully retrieved!"
		});
	});
}; // end listAdmins

// Super Admin lists all events organized by a particular admin
// required input: token and id
// output: message
exports.adminEvents = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}
	if (!req.body.id) {
		return res.status(400).json({
			message: "Admin ID required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// check user permission level
	if (level != 2) {
		return res.status(401).json({
			message: "User needs to be a Super Admin to list an admin's events."
		});
	}

	Event.adminEvents(req.body.id, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't list admin's events."
			});
		}
		res.json({
			events: data,
			message: "Admin's events successfully retrieved!"
		});
	});
}; // end adminEvents

// Super Admin lists all users
// required input: token
// output: users array and message
exports.listUsers = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// check user permission level
	if (level != 2) {
		return res.status(401).json({
			message: "User needs to be a Super Admin to list all users."
		});
	}

	Event.listUsers(userId, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't list users."
			});
		}
		res.json({
			users: data,
			message: "Users successfully retrieved!"
		});
	});
}; // end listUsers

// Super Admin lists titles of all events this user has attended
// required input: token and id
// output: titles array and message
exports.userEvents = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}
	if (!req.body.id) {
		return res.status(400).json({
			message: "User ID required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// check user permission level
	if (level != 2) {
		return res.status(401).json({
			message: "User needs to be a Super Admin to list events a user has attended."
		});
	}

	Event.userEvents(req.body.id, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't list user's events."
			});
		}
		res.json({
			titles: data,
			message: "User's events successfully retrieved!"
		});
	});
}; // end userEvents

// Super Admin approves an event
// required input: token and eventid
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

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// check user permission level
	if (level != 2) {
		return res.status(401).json({
			message: "User needs to be a Super Admin to approve events."
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
// output: token, eventid, title, and message
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
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// change user's permission level
	if (level == 0) {
		level = 1;
	}
	let payload = {userId: userId, level: level};
	let newToken = jwt.sign(payload);

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
			token: newToken,
			eventid: data.eventid,
			title: data.title,
			message: "Created event " + data.title + " successfully!"
		});
	});
}; // end createEvent

// list all events this admin has created
// required input: token
// output: events array and message
exports.listSelfEvents = (req, res) => {
	// check required fields
	if (!req.body.token) {
		return res.status(400).json({
			message: "Token required."
		});
	}

	let token, userId;
  if (jwt.verify(req.body.token)) {
    // decode jwt, then store user ID and level
    token = jwt.decode(req.body.token);
    userId = token.payload.userId;
		level = token.payload.level;
  }
  else {
    return res.status(401).json({
      message: "Token couldn't be verified."
    });
  }

	// check user permission level
	if (level == 0) {
		return res.status(401).json({
			message: "This user has not created any events."
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
	if (!req.params.startdate) {
		return res.status(400).json({
			message: "Start date required."
		});
	}
	if (!req.params.enddate) {
		return res.status(400).json({
			message: "End date required."
		});
	}

	const events = new Event({
		startdate: req.params.startdate,
		enddate: req.params.enddate
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
	if (!req.params.city) {
		return res.status(400).json({
			message: "City required."
		});
	}

	Event.eventsByCity(req.params.city, (err, data) => {
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

// user joins an event
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
			message: "Event ID required."
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

// user leaves an event
// required input: token, eventid, and title
// output: message
exports.leaveEvent = (req, res) => {
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

	Event.leaveEvent(req.body.eventid, userId, (err, data) => {
		if (err) {
			return res.status(500).json({
				message: "Error: Couldn't leave event."
			});
		}
		if (data.affectedRows == 0) {
			return res.status(500).json({
				message: "User isn't a participant of event " + req.body.title + "."
			});
		}
		res.json({
			message: "Left event " + req.body.title + " successfully!"
		});
	});
}; // end leaveEvent
