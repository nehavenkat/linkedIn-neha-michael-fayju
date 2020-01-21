// PROFILE Model:
// {
//     "_id": "5d84937322b7b54d848eb41b", //server generated
//     "name": "Diego",
//     "surname": "Banovaz",
//     "email": "diego@strive.school",
//     "bio": "SW ENG",
//     "title": "COO @ Strive School",
//     "area": "Berlin",
//     "image": ..., //server generated on upload, set a default here
//     "username": "admin",
//     "createdAt": "2019-09-20T08:53:07.094Z", //server generated
//     "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
// }

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
