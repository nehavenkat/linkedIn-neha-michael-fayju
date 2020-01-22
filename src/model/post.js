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

//defining the schema
const Schema = mongoose.Schema

var postSchema = new Schema({
text: {
        type: String,
        required: [true, "Type in a comment!"],
        minlength: 3,
        maxlength: 500
	},
username: {
    type: String,
    required: [true, "username is required!"],
    },
image:{
    type: String,
    //sets a default value for the path
    default: 'http://via.placeholder.com/640x360'
}
}, { timestamps: true});
//If set timestamps, mongoose assigns createdAt and updatedAt fields to the schema,the type assigned is Date.
//{ timestamps: { createdAt: 'created_at' } });

//To use the schema definition, we need to convert our PostSchema into a Model we can work with. 
//To do so, we pass it into mongoose.model(modelName, schema):
const postsCollection = mongoose.model('Post', postSchema);
module.exports = postsCollection;