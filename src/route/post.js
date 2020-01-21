const express = require('express')
const router = express.Router()
const Post = require("../model/post")

router.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.send(posts);
  });

router.get('/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    //Finds a single document by its _id field. findById(id) is almost* equivalent to findOne({ _id: id }). 
    //const post =await Post.findOne({userId = req.params.postId})
    if(post){
    res.send(post)
    }else{
    res.status(404).send("Not found")
    }
    //res.send('get post for single user')
})

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        newPost.save();
        res.send(newPost); 
    } catch (error) {
        res.status(500).send(error);
    }
//res.send('POST  a new post')
})

router.put('/:postId', async (req, res) => {
    try {
        const post = Post.findOneAndUpdate(
                        { _id: req.params.postId },
                        { $set: { ...req.body } }
                        )
        
        } catch (error) {
        res.status(400).send(error);  
         }
    //res.send('update a new post by ID')
})

router.delete('/:postId', async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({_id:req.params.postId})
  } catch (error) {
      res.status(400).send(error)
  } 
    //res.send('DELETE a post by ID')
})

router.post('/:postId/picture', async (req, res) => {
    res.send('POST new picture')
})

module.exports = router;