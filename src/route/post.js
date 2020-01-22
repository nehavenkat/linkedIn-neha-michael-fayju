const express = require("express");
const router = express.Router();

//connecting to the Post Model(schema)
const Post = require("../model/post");

//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 
const multer = require("multer");
const path = require("path");

//https://express-validator.github.io/docs/
//express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {

  //.find will find us all the parameters in the Post {_id,text,username,createdAt,updatedAt,image}
  const posts = await Post.find({});
  res.send(posts);
});

router.get("/:postId", async (req, res) => {
  try {

    //Finds a single document by its _id field. findById(id) is almost equivalent to findOne({ _id: id }).
    //const post =await Post.findOne({userId = req.params.postId})
    const post = await Post.findById(req.params.postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log()
    res.json(error)
  }
});

router.post("/", async (req, res) => {
  try {
    //Documents are inserted with .create, save() this function triggers the middleware.
    const newPost = await Post.create(req.body);
    newPost.save();
    res.send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:postId", async (req, res) => {

  try {

    //https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    const post = await Post.findOneAndUpdate(
                                    { _id: req.params.postId },
                                    { $set: { ...req.body } },
    
    //we should set the new option to true to return the document after update was applied.
                                    { new: true }
    );
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:postId", async (req, res) => {
  try {

    //findOneAndDelete() command finds a matching document, removes it, and passes the found document (if any) to the callback.
    const post = await Post.findOneAndDelete({ _id: req.params.postId });
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/:postId/picture",
              [
                check("image")
                  .isURL()
                  .withMessage("Valid Image URL is needed!")
              ],
            async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { image } = req.body;
    try {
      const response = await Post.findOneAndUpdate(
                                        { _id: req.params.postId },
                                        { image: image },
                                        { new: true }
      );
      response ? res.json(response) : res.json({});
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

//https://www.npmjs.com/package/multer
//var upload = multer({ dest: 'uploads/' })
const upload = multer({});

// req.file is the `image` file
router.post("/:postId/picture", upload.single("image"), async (req, res) => {
  try {
    const imgDest = path.join(__dirname, "../../../img/posts" + req.params.postID + req.file.originalname);
    const imgDestination = req.protocol + "://" + req.get("host") + "/img/posts/" + req.params.postID + req.file.originalname;
    await fs.writeFileSync(imgDest, req.file.buffer);
    console.log(imgDestination);
    const exp = await Post.findOneAndUpdate(
                             { username: req.params.postID }, 
                             { image: imgDestination }, 
                             { new: true, useFindAndModify: false });
    res.send(exp)
  } catch (err) {
    console.log(err);
    res.send(err)
  }
});

module.exports = router;
