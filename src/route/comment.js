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
    try {
        const comments = await Comment.find()
        res.send(comments)
        
    } catch (error) {
        res.send(error)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const newComment = await Comment.findByIdAndUpdate(req.params.id, { $set: {...req.body} }, {new: true})
    
        res.send(newComment)
        
    } catch (error) {
      console.log(error)
      res.send(error)  
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const comments = await Comment.findByIdAndDelete(req.params.id)
        res.send(comments)
        
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;