const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up express app
const app = express();

// Log requests to console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Require our routes into the application
require("./server/routes/")(app);
// Setup a default catch-all route that sends back a response msg in JSoN
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness'
}))

module.exports = app;