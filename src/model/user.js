

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
 
  
    username: {
        type: String,
        required: true,
		unique: true
	},
  password: {
        type: String,
        required: true
	}
}, { timestamps: false});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema);

module.exports = User;
