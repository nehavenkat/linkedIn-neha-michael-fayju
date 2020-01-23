

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const profileSchema = new Schema({
  name: {
    type: String,
    required: [true, "User first name is required!"],
    minlength: 3,
    maxlength: 50
  },
  surname: {
    type: String,
    required: [true, "User last name is required!"],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User email is required!"]
  },
  bio: {
		type: String
	},
  title: {
		type: String
	},
  area: {
		type: String
	},
  image: {
		type: String,
		default: "http://via.placeholder.com/360x640"
	},
	username: {
		type: String,
		unique: true
	}
}, { timestamps: true});

profileSchema.plugin(uniqueValidator);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
