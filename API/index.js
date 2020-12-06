// written by: Phillip Tat from Group 26
// date written: 12/5/20
// purpose: COP4710 Database Project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// parse json requests
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json({message: "COP4710 Project: Exhibition Center Event Website"});
});

require("./app/routes/routes.js")(app);

app.listen(port, () => {
	console.log("Server is running on port %d.", port);
});
