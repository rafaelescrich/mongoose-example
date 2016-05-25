// if our user.js file is at app/models/user.js
var User = require('./app/models/user');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users')
	.post(function(req, res) {
		var user = new User();
		user.name = req.body.name;	
		user.username = req.body.username;
		user.password = req.body.password; 
		

		user.save(function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'User: ' + user.username + ' created!'});
		});
	})
	// get all the users (accessed at GET http://localhost:8080/api/users)
    	.get(function(req, res) {
        	User.find(function(err, users) {
            		if (err)
                		res.send(err);

            		res.json(users);
        	});
    	});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Servidor está escutando na porta: http://localhost:' + port + '/api');

  
// create a new user called chris
var chris = new User({
  name: 'Chris',
  username: 'sevilayhatytyt',
  password: 'password' 
});


// call the built-in save method to save to the database
//chris.save(function(err) {
//  if (err) throw err;

//  console.log('User saved successfully!');
//});
