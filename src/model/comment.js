const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({


    username: {
        type: String
        
    },
    comment: {
        type: String
        
    },
    likes_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });



const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
