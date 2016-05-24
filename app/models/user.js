var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'console error:'));

db.once('open', function() {
 //we're connected!
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name		: String,
	username	: { type: String, required: true, unique: true },
	password	: { type: String, required: true },
	admin		: Boolean,
	created_at	: Date,
	updated_at	: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
