const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');

const expSchema = new Schema({
    role: {
        type: String,
        required: [true, "Role is required!"]
        
    },
    company: {
        type: String,
        required: [true, "Company is required!"],
        minlength: 3,
        maxlength: 150
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
        
    },
    area: {
        type: String
    },
     username: {
        type: String
        
    }, 
    image: {
        type: String,
        default: "http://via.placeholder.com/360x360"
    }
}, { timestamps: true });

//expSchema.plugin(uniqueValidator);

const Exp = mongoose.model("Experience", expSchema);

module.exports = Exp;

/* EXPERIENCE Model:
    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        "role": "CTO",
        "company": "Strive School",
        "startDate": "2019-06-16T22:00:00.000Z",
        "endDate": "2019-06-16T22:00:00.000Z", //could be null
        "description": "Doing stuff here and there",
        "area": "Berlin",
        "username": "admin",
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
        "image": ... //server generated on upload, set a default here
    }  */