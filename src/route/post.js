const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.send(posts);
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    //Finds a single document by its _id field. findById(id) is almost* equivalent to findOne({ _id: id }).
    //const post =await Post.findOne({userId = req.params.postId})
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
    const newPost = await Post.create(req.body);
    newPost.save();
    res.send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:postId", async (req, res) => {

  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: { ...req.body } },
      {new: true}
    );
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.postId });
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.post("/:postId/picture", async (req, res) => {
//   res.send("POST new picture");
// });

// start here
router.post(
    "/:postId/picture",
    [
      check("image")
        .isURL()
        .withMessage("Valid Image URL is needed!")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { image } = req.body;
      try {
        const response = await Post.findOneAndUpdate(
          { _id : req.params.postId },
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

module.exports = router;
