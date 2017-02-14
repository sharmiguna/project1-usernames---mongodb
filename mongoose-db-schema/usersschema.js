var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var User = new Schema({
    FirstName: String,
    LastName : String,
    Title : String,
    age: Number,
	sex: String,
});

mongoose.model('Users', User);
mongoose.connect('mongodb://localhost/usersschema');