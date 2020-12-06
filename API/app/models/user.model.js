// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const sql = require("./db.js");

const User = function(users) {
	this.username = users.username;
	this.password = users.password;
	this.name = users.name;
	this.email = users.email;
	this.city = users.city;
};

User.registerUser = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			return result(err, null);
		}
		return result(null, {username: res.username, ...newUser});
	});
};

User.loginUser = (currentUser, result) => {
	sql.query(`SELECT * FROM users WHERE username = '${currentUser}'`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res[0]);
		}
		return result({err: "User not found."}, null);
	});
};

User.superCheck = (id, result) => {
	sql.query(`SELECT id FROM superadmins WHERE id = '${id}'`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res[0]);
		}
		return result({err: "Not superadmin."}, null);
	});
};

User.adminCheck = (id, result) => {
	sql.query(`SELECT organizer FROM events WHERE organizer = '${id}'`, (err, res) => {
		if (err) {
			return result(err, null);
		}
		if (res.length) {
			return result(null, res[0]);
		}
		return result({err: "Not admin."}, null);
	});
};

module.exports = User;
