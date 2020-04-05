const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
// Configure bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Import route
const notesRoute = require('./src/routes/routes.js');

app.use('/', notesRoute);

// Run the application on port
const server = app.listen(4000, () => {
    console.log('listening on port %s...', server.address().port);
});