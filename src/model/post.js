//POST Model:
//{
//    "_id": "5d93ac84b86e220017e76ae1", //server generated
 //   "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
   // "username": "admin", 
   // "createdAt": "2019-10-01T19:44:04.496Z", //server generated
  //  "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
   // "image": ... //server generated on upload, set a default here
//}

const mongoose = require('mongoose');
const Schema = mongoose.Schema

var postSchema = new Schema({
text: {
        type: String,
        required: [true, "Type in a comment!"],
        minlength: 3,
        maxlength: 50
	},
username: {
		type: String,
    },
image:{
    type: String,
    default: 'image'
}
}, { timestamps: true});

const postsCollection = mongoose.model('Post', postSchema);
module.exports = postsCollection;