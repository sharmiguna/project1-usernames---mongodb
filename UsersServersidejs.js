var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})
); 

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/usersschema');
var db = mongoose.connection;

db.on('error', function(err) {
	console.log('connection error', err);
});

db.once('open', function() {
	console.log('connected to mongodb');
})

var Schema = mongoose.Schema;
var userSchema = new Schema({
    FirstName: String,
    LastName : String,
    Title : String,
    age: Number,
	sex: String,
});

var User = mongoose.model('User', userSchema);

var sri = new User({
	FirstName: 'Sriram',
    LastName : 'Venky',
    Title : 'Teacher',
    age: 27,
	sex: 'male',
});
sri.save(function(err, data) {
	if(err)
		console.log('err');
	else
		console.log('saved', data);
});

var shashu = new User({
	FirstName: 'shashu',
    LastName : 'kanna',
    Title : 'scientist',
    age: 11,
	sex: 'male',
});
shashu.save(function(err, data) {
	if(err)
		console.log('err');
	else
		console.log('saved', data);
});

var sharmi = new User({
	FirstName: 'Sharmi',
    LastName : 'Sri',
    Title : 'Painter',
    age: 25,
	sex: 'female',
});
sharmi.save(function(err, data) {
	if(err)
		console.log('err');
	else
		console.log('saved', data);
});

var harshad = new User({
	FirstName: 'harshad',
    LastName : 'vasan',
    Title : 'Sportsman',
    age: 5,
	sex: 'male',
});
harshad.save(function(err, data) {
	if(err)
		console.log('err');
	else
		console.log('saved', data);
});

var vasan = new User({
	FirstName: 'vasan',
    LastName : 'guna',
    Title : 'Lead',
    age: 29,
	sex: 'male',
});
vasan.save(function(err, data) {
	if(err)
		console.log('err');
	else
		console.log('saved', data);
});

app.set('view engine', 'ejs');

var router = express.Router();

router.get('/usershome', function(req, res) {
	console.log("in usershome page");
	res.sendfile('userslist.html');
});



router.route('/usershome/users')
	.get(function(req, res) {
		console.log("in usershome/users page - get ");

		User.find({},{}, function(err, docs) {
			console.log('the users list: ' + docs);
			res.send(docs);
		});
	})

	.post(function(req, res) {
		console.log("in usershome/users page - post ");

		var user = new User();
		user.FirstName = req.body.FirstName;
		user.LastName = req.body.LastName;
		user.Title = req.body.Title;
		user.age = req.body.age;
		user.sex = req. body.sex;

		user.save(function(err) {
			if(err)
				res.send(err);
			res.json({message : 'User created'});
		});
	});

router.route('/usershome/users/createuser')
	.get(function(req, res) {
		console.log("creating user ");
        res.sendfile('userscreate.html');
		});

router.route('/usershome/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.send('error while in route taking parameter value',err);
                console.log('error while in route taking parameter value');
            }
            else
            {
            	var id = user._id;
            	var fName = user.FirstName;
            	var lName = user.LastName;
            	console.log('parameter passed to edit user page', id);

	            res.render('edituser', { 
					ID: id,
					FirstName: fName,
					LastName: lName
				});
        	}
        });
    })

	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			console.log("updating user: " + req.params.user_id);
			if(err) {
				console.log("error updating user: " + req.params.user_id);
				res.send(err);
			} else {
				user.Title = req.body.Title;
				user.age = parseInt(req.body.age);
				user.sex = req.body.sex;
				user.save(function(err) {
					if(err) {
						console.log("error updating user: " + req.params.user_id);
						res.send(err);
					} else {
						console.log("successfully updated user: " + req.params.user_id);
						res.json({message : 'User updated'});
					}
				});
			}
			
		});
	})

	.delete(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			console.log(' inside delete function for parameter' , req.params.user_id);
			if(err || !user) {
				console.log('stuck with error inside delete function');
				res.send(err);
			}
			else {
				console.log('ready to delete ' + user);
				user.remove(function(err) {
					if(err) {
						console.log('cannot remove. stuck here');
						res.send('the value of error',err);
					}
					else {
						console.log('deleted');
						res.json({message : 'User deleted'});
					}
				});
			}
		});
	});

app.use('/', router);


app.listen(8081);
