var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    FirstName: String,
    LastName : String,
    Title : String,
    age: Number,
	sex: String,
});

//module.exports = mongoose.model('User', userSchema);

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
