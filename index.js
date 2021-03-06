var app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('monk')(process.env.MONGO_URI);
//var request = require('request'); // used to send requests, for testing

// import event class/object and create a new instance
var Event = require('./events/events.js');
var events = new Event('events');

// import campus class/object and create a new instance
var Campus = require('./campuses/campuses.js');
var campuses = new Campus('campus');

// import user class/object and create a new instance
var User = require('./users/users.js');
var users = new User('users');

// import ministry class/object and create a new instance
var Ministry = require('./ministries/ministries.js');
var ministries = new Ministry('ministries');

// import minstryTeam class/object and create a new instance
var MinistryTeam = require('./ministryTeams/ministryTeams.js');
var minTeams = new MinistryTeam('ministryteams');

var SummerMission = require('./summerMissions/summerMissions.js');
var sumMissions = new SummerMission('summermissions');

var CommunityGroup = require('./communityGroups/communityGroups.js');
var comGroups = new CommunityGroup('TBD');

// I don't know what should happen when root is requested... so I'm leaving this
app.get('/', function (req, res, next) {
    res.writeHead(200, {
      'Content-Type' : 'text/html',
    });

   res.end('<!DOCTYPE html> <html> <head> <title>Test</title></head><body>'
           + '<h1>Monkeys</h1></body></html>');
});

app.get('/campuses', function (req, res) {
	campuses.getAll(req, res, db);
});

app.get('/campuses/:id', function (req, res) {
	campuses.getById(req, res, db);
});

app.get('/events', function (req, res) {
	events.getAll(req, res, db);
});

app.get('/events/:id', function (req, res) {
	events.getById(req, res, db);
});

app.get('/users', function (req, res) {
    users.getAll(req, res, db);
});

app.get('/users/:id', function (req, res) {
    users.getById(req, res, db);
});

// testing function to make sure that json is being sent to the url
/*app.get('/testUserCreation', function (req, res) {
    request({
        method: 'POST',
        url: 'http://localhost:8080/createUser',
        json: { first: 'Bob', last: 'Builder', email: 'bob@builder.com' }
    }, function (err, response, body) {
        console.log('testing ' + body);
    });
});*/

app.post('/users', function (req, res) {
    users.createUser(req, res, db);
});

app.get('/ministries', function (req, res) {
    ministries.getAll(req, res, db);
});

app.get('/ministries/:id', function (req, res) {
    ministries.getById(req, res, db);
});

app.get('/ministryTeams', function (req, res) {
    minTeams.getAll(req, res, db);
});

app.get('/ministryTeams/:id', function (req, res) {
    minTeams.getById(req, res, db);
});

app.get('/summerMissions', function (req, res) {
    sumMissions.getAll(req, res, db);
});

app.get('/summerMissions/:id', function (req, res) {
    sumMissions.getById(req, res, db);
});

app.get('/communityGroups', function (req, res) {
    comGroups.getAll(req, res, db);
});

app.get('/communityGroups/:id', function (req, res) {
    comGroups.getById(req, res, db);
});

// for Cntrl + C shutdowns
process.on('SIGINT', function() {
	closeServer();
});

// for kill/pkill shutdowns
process.on('SIGTERM', function() {
	closeServer();
});

function closeServer() {
	console.log('Closing connection to database...');
	db.close(function() {
		console.log('Exiting program now.');
		process.exit();
	});
}

app.listen(8080);