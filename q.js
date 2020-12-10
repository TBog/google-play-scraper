var gplay = require('./index');

// Routing
var express = require("express");
var logfmt = require("logfmt");
var app = express();

// Set logger
app.use(logfmt.requestLogger());

// Routes definitions
var routes = {
	root: '/',
	app: '/app/:appID',
	search: '/search/:queryStr'
}

// API response headers
var apiHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	'Access-Control-Allow-Headers': 'Content-Type'
}

// Routing Root
app.get(routes.root, function(req, res) {
	var warningString = "Usage: /app/:appid"+ " <br/>"+" Example: /app/com.meetsapp";
	warningString += "<br />Usage: /search/:appName"+ " <br/>"+" Example: /search/meetsapp";
	res.send(warningString);
});

// Routing App
app.get(routes.app, function(req, res) {

// 	res.writeHead(200, apiHeaders);

	// Get options from request
// 	var options = {
// 		appId: req.params.appID,
// 		lang: req.headers["accept-language"].split(",")[0].replace("-", "_")
// 	};

	gplay.app({appId: req.params.appID})
    .then( (out) => res.send(out) )
    .catch( console.log );
});

// gplay.app({appId: 'com.google.android.apps.translate'})
//   .then(console.log, console.log);
  
// Initialize
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
