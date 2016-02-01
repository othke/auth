// Import package
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var config = require('./config');
var User = require('./app/models/user');

// Setup mongo and secret
var port = process.env.PORT || 3000;
mongoose.connect(config.mongo_url);
app.set('super_secret', config.secret);

// Setup bodyParser and logger
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(logger('dev'));

// Default Home
app.get('/', function(req, res){
	res.send('gogogogo');
});

// Create default user
app.get('/setup', function(req, res){
	var defaultUser = new User({name: "olivier", password: "olivier", admin: true});
	defaultUser.save(defaultUser, function(err){
		if(err) throw err;
		console.log('user create');
		res.json({success: true});
	});	
});

// Router pour l'API
var apiRoute = express.Router();

// Standard API Page
apiRoute.get('/', function(req, res){
	res.json({message: "Welcome to the auth API"});
});

// Get all the users
apiRoute.get('/users', function(req, res){
	User.find({}, function(err, users){
		if(err) throw err;
		res.json(users);
	});
});

// Use the API Routes
app.use('/api', apiRoute);

// Start Server
app.listen(port, function(){
	console.log('let\'s go marco');
});


