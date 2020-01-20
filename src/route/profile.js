const express = require("express");
const router = express.Router();
const Profile = require("../model/profile");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const response = await Profile.find(
      {},
      "_id name surname image title area"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
  res.send("get all profiles");
});
router.get("/:username", async (req, res) => {
  res.send("get profile for single user");
});
router.post(
  "/",
  [
    check("email")
      .isEmail()
      .withMessage("A valid email is required!"),
    check("name").exists().withMessage("User first name is required!"),
    check("surname").exists().withMessage("User last name is required!"),
    check("username").exists().withMessage("A unique username is required!")
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
  res.send("update a profile by ID");
});
router.post("/:username/picture", async (req, res) => {
  res.send("POST new picture");
});
router.get("/:username/CV", async (req, res) => {
  res.send("POST CV");
});

module.exports = router;
