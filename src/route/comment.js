const express = require("express");
const router = express.Router();
const Comment = require("../model/comment")

router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create({ ...req.body, CreatedAt: new Date() })
        newComment.save()
        res.send(newComment)
        
    } catch (error) {
      console.log(error)
      res.send(error)  
    }
})

router.get("/", async (req, res) => {
    const comments = await Comment.find()
    res.send(comments)
})

module.exports = router;