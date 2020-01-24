const express = require("express");
const router = express.Router();
const Profile = require("../model/profile");
const { check, validationResult } = require("express-validator");
const User = require("../model/user")

router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({ ...req.body })
        newUser.save()
        res.send(newUser)
        
    } catch (error) {
      console.log(error)
      res.send(error)  
    }
})

module.exports = router;