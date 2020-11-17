// Dependencies.
const express = require("express");
const app = express();

// Set the port for the express server.
const PORT = process.env.PORT || 8080;


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Parse application body as JSON.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
const routes = require("./controllers/burgersController.js");
app.use(routes);


// Start the server.
app.listen(PORT, function () {
	console.log("Server listening on: http://localhost:" + PORT);
});
