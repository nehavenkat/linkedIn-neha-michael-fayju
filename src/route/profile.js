const express = require("express");
const router = express.Router();
const Profile = require("../model/profile");
const { check, validationResult } = require("express-validator");
const { writeFile } = require("fs-extra");
const multer = require("multer");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const response = await Profile.find(
      {},
      "_id name surname image title area username"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const response = await Profile.findOne(
      { username: req.params.username },
      "_id name surname image title area username"
    );
    response ? res.json(response) : res.json({});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.post(
  "/",
  [
    check("email")
      .isEmail()
      .withMessage("A valid email is required!"),
    check("name")
      .exists()
      .withMessage("User first name is required!"),
    check("surname")
      .exists()
      .withMessage("User last name is required!"),
    check("username")
      .exists()
      .withMessage("A unique username is required!")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, surname, email, bio, title, area, username } = req.body;
    try {
      const response = await Profile.create({
        name,
        surname,
        email,
        bio,
        title,
        area,
        username
      });
      response.save();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);
router.put("/:username", async (req, res) => {
  const { name, surname, title, area, bio, email } = req.body;
  let update = {};
  if (name) update = { ...update, name };
  if (surname) update = { ...update, surname };
  if (title) update = { ...update, title };
  if (area) update = { ...update, area };
  if (bio) update = { ...update, bio };
  if (email) update = { ...update, email };
  try {
    const response = await Profile.findOneAndUpdate(
      { username: req.params.username },
      update,
      { new: true }
    );
    response ? res.json(response) : res.json({});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
const upload = multer({});
router.post("/:username/picture", upload.single("image"), async (req, res) => {
  try {
    const ext = path.extname(req.file.originalname);
    const imgDest = path.join(
      __dirname,
      "../../images/profile/" + req.params.username + ext
    );
    const imgServe =
      req.protocol +
      "://" +
      req.get("host") +
      "/images/profile/" +
      req.params.username +
      ext;
    await writeFile(imgDest, req.file.buffer);
    const post = await Profile.findOneAndUpdate(
      req.params.postId,
      { image: imgServe },
      { new: true }
    );
    res.send(post);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.get("/:username/CV", async (req, res) => {

  
  res.send("POST CV");
});
router.delete("/:id", async (req, res) => {
  try {
    const response = await Profile.findByIdAndDelete(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
